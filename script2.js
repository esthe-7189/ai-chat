const GIRLFRIEND_TYPES = {
    //타입
    thoughtful: {
      type: "thoughtful",
      img: "./images/thoughtful.jpg",
    },
    cute: {
      type: "cute",
      img: "./images/cute.jpg",
    },
    cool: {
      type: "cool",
      img: "./images/cool.jpg",
    },
  };
  //내가 선택한 친구
  let selectedGirlFriend = null;
  
  // 여자친구 타입 선택 처리
  function selectType(girlfriendType) {
    // 선택시 style명:active
    // 모든 타입 선택시 스타일 해제, forEach사용
    document.querySelectorAll(".girlfriend-option").forEach((option) => {
      option.classList.remove("active");
    });
  
    // 1)선택한 타입 class 스타일 추가 2)선택/클릭시 스타일 class 생성 
    document.getElementById(girlfriendType).classList.add("active");
    //alert(girlfriendType + " 타입을 선택하셨습니다.");
    //document.querySelector(`.girlfriend-option[onclick="selectType('${girlfriendType}')"]`).classList.add("active");
  
    //선택된 친구 타입 저정하고 채팅 리셋
    selectedGirlFriend = GIRLFRIEND_TYPES[girlfriendType];
    resetChat();
    
  }
  
  function resetChat() {
    const chatContent = document.getElementById("chatMessages");
    chatContent.innerHTML = ""; 
  }
  
  // 채팅 메시지 전송 처리
  async function sendMessage() {
    
    //사용자 입력 필드  
    const input = document.getElementById("chatInput");
    const message = input.value.trim();
  
    if (message) {
      //채팅 목록에 사용자 메시지 표시하고, 입력필드 비우기 
      displayMessage("user", message);
      input.value = "";
  
      // ChatGPT OpenAI에 문자 보내기
      fetchResponse(message);
    } else {
      alert("메시지를 입력하세요.");
    }
  }
  
  // 서버 응답 표시(채팅 메시지 목록 표시)
  function displayMessage(sender, text) {
    //채팅 메시지 목록  
    const chatContent = document.getElementById("chatMessages");
  
    // -새로운 div 생성 -생성된 요소에 type 인자로 받아서 그 이름으로 클래스 추가
    const messageElement = document.createElement("div");
    messageElement.classList.add(sender);
    
  
    // -아이콘 img 객체 생성 -user 이미지 경로 -class 추가(css명: profile-icon)
    const profileIcon = document.createElement("img");
    profileIcon.src = sender === "user" ? "./images/user-profile.jpg" : selectedGirlFriend.img; 
    profileIcon.classList.add("profile-icon");
  
    // -새로운 객체 span 생성 -새메시지 추가
    const messageText = document.createElement("div");
    if(sender ==="user"){
      messageText.classList.add("chat-message-text-user");
    }else{
      messageText.classList.add("chat-message-text-response");
    }
    messageText.textContent = text;
  
    // 아이콘과 텍스트 분리하여 span 표시, user라면 우측
    if (sender === "user") {
      messageElement.appendChild(messageText);
      messageElement.appendChild(profileIcon);
      
    } else {
      messageElement.appendChild(profileIcon);
      messageElement.appendChild(messageText);
    }
  
    //목록에 span 표시하고, 스크롤 처리 
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight;
  }
  
  // ChatGPT OpenAI API 호출
  async function fetchResponse(message) {
    try {
      const response = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          girlfriendType: selectedGirlFriend.type,
        }),
      });
      const data = await response.json();
      displayMessage("bot", data.reply.content);
    } catch (error) {
      displayMessage("bot", "An error occurred. please try again.");
    }
  }
  