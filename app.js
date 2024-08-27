class Chatbox{
    constructor(){
        this.args={
            openButton:document.querySelector('chatbox_button'),
            Chatbox: document.querySelector('.chatbox_support'),
            sendbox: document.querySelector('.send_button')
        }
        this.state = false;
        this.message = [];
    }
    display(){
        const{
            openButton, chatBox, sendButton} = this.args;
            openButton.addEventListener('click', ()=> this.toggleState(chatBox))
            sendButton.addEventListener('click', ()=> this.onSendButton(chatBox))
            const node = chatBox.querySelector('input');
            node.addEventListener("keyup",({key}) =>{
                if(key == "Enter"){
                    this.onSendButton(chatBox)
                }
            })
        }
        toggleState(chatBox){
            this.state = !this.state;
            //show or hide the box
            if(this.state){
                chatBox.classList.add('chatBox--active')
            }else{
                chatBox.classList.remove('chatBox--active')
            }
        }
        onSendButton(chatBox){
            var textField = chatbox.querySelector('input');
            let text1 = textField.value
            if(text1 == ""){
                return;
            }
            let msg1 = {name:"user", message:text1}
            this.mwessages.push(msg1);
            fetch('http://127.0.0.1:5000/predict',{
                method: 'POST',
                body:JSON.stringify({message:text1}),
                mode:'cors',
                headers:{
                    'Content-Type':'application/json'
                },
            })
            .then(r=>r.json())
            .then(r=>{
                let msg2 ={ name:"sam", message:r.answer};
                this.mwessages.push(msg2);
                this.updateChatText(chatbox)
                textField.value=''
            }).catch((error) =>{
                console.error('error:',error);
                this.updateChatText(chatbox)
                textField.value=''
            });
        }
        updateChatText(chatbox){
            var html='';
            this.messages.slice().reverse().forEach(function(item,index) {
                if(item.name == "sam"){
                    html += '<div class="messages_item messages_item--visitor">' + item.message + '</div>'
                }else{
                    html += '<div class="messages_item messages_item--operator">' + item.message + '</div>'
                }
                
            });
            const chatmessage = chatbox.querySelector('.chatbox_message');
            chatmessage.innerHTML = html;
        }
    }
    const chatbox = new chatbox();
    chatbox.display();
