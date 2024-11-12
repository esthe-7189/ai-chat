const GIRLFRIEND_TYPES = {
    //타입
        romantic: {
            type: "thoughtful",
            img: "./images/romantic.jpg",
        },
        cool: {
            type: "cute",
            img: "./images/cool.jpg",
        },
        clumsy: {
            type: "cool",
            img: "./images/clumsy.jpg",
    
        },
    
    };
    //내가 선택한 친구
            let selectedGirlFriend = null;
    
            // 여자친구 타입 선택 함수
            function selectType(girlfriendType) {
    
                // 모든 타입 선택 해제
                document.querySelectorAll('.girlfriend-option').forEach(option => {
                    option.classList.remove('active');
                });
    
                // 선택한 타입 활성화
                document.getElementById(girlfriendType).classList.add('active');
                alert(girlfriendType + " 타입을 선택하셨습니다.");
                
                //JavaScript에서 문자열 내에서 ${} 구문을 사용하려면 백틱(`)으로 감싼 템플릿 리터럴이 필요
                document
                .querySelector(
                    `.girlfriend-option[onclick="selectType('${girlfriendType}')"]`
                )
                .classList.add("active");
    
            //선택된 친구 타입 저정하고 채팅 리셋
            selectedGirlFriend = GIRLFRIEND_TYPES[girlfriendType];
            resetChat();
            }
    
            function resetChat(){
                const chatContent = document.getElementById("chatMessages");
                chatContent.innerHTML = ""; //기존 채팅 내용 삭제
                
            }
    
            // 채팅 메시지 전송 함수
            async function sendMessage() {
                const input = document.getElementById('chatInput');
                const message = input.value.trim(); //텍스트 앞뒤 공백 제거
                if (message) {
                    displayMessage("user", message);
                    input.value = "";
                    fetchResponse(message); //fetchResponse로 백앤드와 대화
    
                } else {
                    alert("메시지를 입력하세요.");
                }
            }
    
    
            // 서버 응답 표시
            function displayMessage(sender, text) {
                const chatContent = document.getElementById('chatMessages');
    
                // 응답 메시지 요소 생성
                const messageElement = document.createElement('div');
                messageElement.classList.add(sender);
                
                const profileIcon = document.createElement('img');
                profileIcon.src =
                     sender === "user" ? "./images/user-profile.jpg" : selectedGirlFriend.img; // 내 응답 아이콘 이미지 경로
                profileIcon.classList.add('profile-icon');
    
                const messageText = document.createElement('span');
                messageText.classList.add('chat-message-text');
                messageText.textContent = text;
    
                // 아이콘과 텍스트 분리하여 표시
                if(sender === "user"){
                    messageElement.appendChild(messageText);
                    messageElement.appendChild(profileIcon);
                }else{
                    messageElement.appendChild(profileIcon);
                    messageElement.appendChild(messageText);
                }
                
                chatContent.appendChild(messageElement);
                chatContent.scrollTop = chatContent.scrollHeight;
            }
    
            // OpenAI API 호출 함수, fetch, 비동기는 try/catch 로 에러잡기 꼭~
            async function fetchResponse(message) {
                try {
                    const response = await fetch("http://localhost:5001/chat",{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({message,girlfriendType:selectedGirlFriend.type})
                    });
                    const data = await response.json();
                    displayMessage("bot", data.reply.content);
                } catch (error){
                    displayMessage("bot", "An error occurred. please try again.");
                }
                
            }