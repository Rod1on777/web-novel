document.addEventListener('DOMContentLoaded', () => {
    const scene1 = document.getElementById('scene-1');
    const scene2 = document.getElementById('scene-2');
    const scene3 = document.getElementById('scene-3');
    const scene4 = document.getElementById('scene-4');
    const scene5 = document.getElementById('scene-5');
    const scene6 = document.getElementById('scene-6');
    const scene7 = document.getElementById('scene-7');
    const scene8 = document.getElementById('scene-8');
    const scene9 = document.getElementById('scene-9');
    const scene10 = document.getElementById('scene-10');
    const scene11 = document.getElementById('scene-11');
    const scene12 = document.getElementById('scene-12');
    const scene13 = document.getElementById('scene-13');
    const scene14 = document.getElementById('scene-14');
    const scene15 = document.getElementById('scene-15');
    const scene16 = document.getElementById('scene-16');
    const scene17 = document.getElementById('scene-17');
    const scene18 = document.getElementById('scene-18');
    const scene19 = document.getElementById('scene-19');
    const scene20 = document.getElementById('scene-20');
    const scene21 = document.getElementById('scene-21');
    const scene22 = document.getElementById('scene-22');
    const scene23 = document.getElementById('scene-23');
    const scene24 = document.getElementById('scene-24');
    const scene25 = document.getElementById('scene-25');
    const scene26 = document.getElementById('scene-26');
    const scene27 = document.getElementById('scene-27');
    const scene28 = document.getElementById('scene-28');
    const scene29 = document.getElementById('scene-29');

    const sceneSelectorContainer = document.getElementById('scene-selector-container');
    const sceneSelector = document.getElementById('scene-selector');
    const goToSceneButton = document.getElementById('go-to-scene-button');

    const startButton = document.getElementById('start-button');
    const mainMenu = document.getElementById('main-menu');
    const gameOverMenu = document.getElementById('game-over-menu');
    const gameOverGood = document.getElementById('game-over-good');
    const gameOverNeutral = document.getElementById('game-over-neutral');
    const gameOverBad = document.getElementById('game-over-bad');
    const novelContainer = document.getElementById('novel-container');
    const videoScene = document.getElementById('video-scene');
    const game1 = document.getElementById('showGame1');
    const game2 = document.getElementById('showGame2');
    const storyVideo = document.getElementById('story-video');
    let characterNameElement = scene1.querySelector('.character-name');
    let characterContainer = scene1.querySelector('.character-container');
    let character2Container = scene1.querySelector('.character2-container');
    let dialogueElement = scene1.querySelector('.dialogue');
    let nextButton = scene1.querySelector('.next-button');
    let skipButton = videoScene.querySelector('.skip-button');
    let restartButton = gameOverMenu.querySelector('.restart-button');
    let choicesContainer = scene1.querySelector('.choices');
    let currentDialogueIndex = 0;
    let isTyping = false;

    let reputationValue = scene8.querySelector('.reputation-value');

    let choiceButton1 = scene8.querySelector('.choice-button1');
    let choiceButton2 = scene8.querySelector('.choice-button2');
    let choiceButton3 = scene8.querySelector('.choice-button3');

    let herbalistReputation = 40
    let filimonReputation = 50;
    let supervisorReputation = 30;

    let finalChoice = 0;
    let map = false;

    let playerReputation = 50;
    const maxReputation = 100;
    const minReputation = 0;

    const volumeSlider = document.getElementById('volume-slider');

    const bgmloops = {
        'bgm1': document.getElementById('bgm1'),
        'bgm2': document.getElementById('bgm2'),
        'bgm3': document.getElementById('bgm3'),
        'bgm4': document.getElementById('bgm4'),
        'bgm5': document.getElementById('bgm5'),
        'bgm6': document.getElementById('bgm6'),
        'bgm7': document.getElementById('bgm7'),
        'bgm8': document.getElementById('bgm8'),
        'bgm9': document.getElementById('bgm9'),
        'bgm10': document.getElementById('bgm10'),
    };
    let sound1 = document.getElementById('sound1');
    let currentBGM = null;
    function playBgm(music) {
        const bgmToPlay = bgmloops[music];
        if (currentBGM && currentBGM !== bgmToPlay) {
            currentBGM.pause();
        }
        if (bgmToPlay) {
            if (bgmToPlay.paused || bgmToPlay.ended) {
                bgmToPlay.play();
            }
            currentBGM = bgmToPlay;
        } else {
            if (currentBGM) {
                currentBGM.pause();
                currentBGM.currentTime = 0;
                currentBGM = null;
            }
        }
    }

    function updateReputationDisplay(reputationValue) {
        const percentage = ((playerReputation - minReputation) / (maxReputation - minReputation)) * 100;
        reputationValue.style.width = `${percentage}%`;
        reputationValue.style.backgroundColor = percentage < 30 ? 'red' : percentage > 70 ? 'lightgreen' : 'yellow';
    }

    function changeReputation(amount, reputationValue) {
        playerReputation += amount;
        playerReputation = Math.max(minReputation, Math.min(maxReputation, playerReputation));
        updateReputationDisplay(reputationValue);
        console.log(`Player reputation: ${playerReputation}`);
    }


    function typeText(element, text, color, speed = 30, callback) {
        let i = 0;
        element.textContent = '⠀';
        element.style.color = color;
        const intervalId = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(intervalId);
                if (callback) {
                    callback();
                }
            }
        }, speed);
        return intervalId;
    }

    //  ------------------- MAIN MENU ---------------------

    if (startButton && mainMenu && novelContainer && scene1) {
        startButton.addEventListener('click', () => {
            mainMenu.classList.remove('active');
            novelContainer.classList.add('active');
            scene1.classList.add('active');
            showScene1();
            //game2.classList.add('active');
            //showGame2();
        });
    } else {
        console.error('not all elements exist');
    }

    let newVolume = 100;
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (event) => {
            newVolume = parseFloat(event.target.value) / 100;
            if (currentBGM != null) {
                currentBGM.volume = newVolume;
            }
            if (storyVideo != null) {
                storyVideo.volume = newVolume;
            }
            console.log("Volume: " + newVolume);
        });
    } else {
        console.log("volumeSlider missing");
    }

    //  ------------------- SCENE 1 ---------------------

    const scene1Data = [
        { name: "", text: "", color: "" },
        { name: "Andrey", text: "Hi, Aunt Sveta! How are you doing?", color: "#000000" },
        { name: "Andrey", text: "Are you getting ready for Grandma's birthday?", color: "#000000" },
        { name: "Aunt Sveta", text: "Andryushenka, hello, dear!", color: "#470000" },
        { name: "Aunt Sveta", text: "Yes, we're bustling about slowly but surely.", color: "#470000" },
        { name: "Aunt Sveta", text: "I've already diced the Olivier salad, and the herring under a fur coat is waiting for its turn.", color: "#470000" },
        { name: "Aunt Sveta", text: "You are definitely coming, right?", color: "#470000" },
        { name: "Aunt Sveta", text: "Grandma is so looking forward to seeing you!", color: "#470000" },
        { name: "Andrey", text: "Of course, I'll be there! How could I miss such an event?", color: "#000000" },
        { name: "Andrey", text: "I love Grandma very much.", color: "#000000" },
        { name: "Andrey", text: "What time are we all gathering?", color: "#000000" },
        { name: "Aunt Sveta", text: "We're expecting everyone around two o'clock.", color: "#470000" },
        { name: "Aunt Sveta", text: " The table is already groaning with food; we've baked three kinds of pies alone!", color: "#470000" },
        { name: "Andrey", text: "Oh, I can imagine!", color: "#000000" },
        { name: "Andrey", text: "Well, all right then, see you tomorrow. Wait for me!", color: "#000000" },
        { name: "Aunt Sveta", text: "We'll be waiting, Andryushenka. Take care of yourself!", color: "#470000" },
    ];

    function showScene1() {
        console.log("Scene 1");
        nextButton = scene1.querySelector('.next-button');
        characterNameElement = scene1.querySelector('.character-name');
        characterContainer = scene1.querySelector('.character-container');
        character2Container = scene1.querySelector('.character2-container');
        currentDialogueIndex = 0;
        playBgm("bgm1");
        if (scene1) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene1Data.length) {
                        isTyping = true;
                        const currentDialogue = scene1Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene1Data[currentDialogueIndex].text, scene1Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Aunt Sveta") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }

                        if (currentDialogue.name == "Andrey") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }
                    } else {
                        showScene2();
                        sound1.play();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene1');
        }
    }



    //  ------------------- SCENE 2 ---------------------

    const scene2Data = [
        { name: "", text: "", color: "" },
        { name: "Narrator", text: "Many relatives are at the table, everyone is talking and laughing animatedly.", color: "#525252" },
        { name: "Narrator", text: "Andrey looks around.", color: "#525252" },
        { name: "Andrey", text: "Ba, isn't Dimka here yet? I thought he said he'd come.", color: "#000000" },
        { name: "Grandma", text: "Dimka? Yes, he called a couple of days ago, said his shift was ending and he'd try to make it. ", color: "#5900b3" },
        { name: "Grandma", text: "He's probably running late.", color: "#5900b3" },
        { name: "Grandma", text: "The roads aren't great right now, and their work site is far away.", color: "#5900b3" },
        { name: "Andrey", text: "Yeah, I remember. Do you know exactly where he's working now?", color: "#000000" },
        { name: "Grandpa", text: "Oh, Andrey, I don't remember exactly. Seems like some new drilling rig, far out of town.", color: "#2a00b3" },
        { name: "Grandpa", text: "He said the connection there was bad.", color: "#2a00b3" },
        { name: "Andrey", text: "Bad connection? But wasn't he supposed to be back already? ", color: "#000000" },
        { name: "Grandpa", text: "Yeah, I think so.", color: "#2a00b3" },
        { name: "Grandpa", text: "He was even boasting that he'd be back just in time for Grandma's birthday and bring a present.", color: "#2a00b3" },
        { name: "Narrator", text: "Andrey dials brother's number", color: "#525252" },
        { name: "Narrator", text: "(beep... beep... beep...)", color: "#525252" },
        { name: "Andrey", text: "No answer...", color: "#000000" },
        { name: "Grandma", text: "Oh, don't worry, you never know what could have happened.", color: "#5900b3" },
        { name: "Grandma", text: "Maybe his phone died, or the connection really is bad.", color: "#5900b3" },
        { name: "Grandma", text: "They're surrounded by taiga out there. ", color: "#5900b3" },
        { name: "Narrator", text: " Andrey calming down a bit.", color: "#525252" },
        { name: "Andrey", text: "You're probably right. Okay, let's raise a toast to Grandma's health!", color: "#000000" },
        { name: "Narrator", text: "Everyone clinks glasses, but Andrey's worry remains.", color: "#525252" },
    ];

    function showScene2() {
        console.log("Scene 2");
        nextButton = scene2.querySelector('.next-button');
        characterNameElement = scene2.querySelector('.character-name');
        characterContainer = scene2.querySelector('.character-container');
        character2Container = scene2.querySelector('.character2-container');
        dialogueElement = scene2.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm1");

        scene1.classList.remove('active');
        scene2.classList.add('active');

        if (scene2) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene2Data.length) {
                        isTyping = true;
                        const currentDialogue = scene2Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene2Data[currentDialogueIndex].text, scene2Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Grandma") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }

                        if (currentDialogue.name == "Grandpa") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }

                    } else {
                        showScene3();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene2');
        }
    }

    //  ------------------- SCENE 3 ---------------------

    const scene3Data = [
        { name: "", text: "", color: "" },
        { name: "Andrey", text: "Hello. This is Andrey, Dmitry Ivanov's brother.", color: "#000000" },
        { name: "Andrey", text: "I wanted to check how he's doing? He was supposed to return from his shift a few days ago, but he's still not back.", color: "#000000" },
        { name: "Voice on the phone", text: "Ah, hello. Yes, Ivanov worked for us.", color: "#bd0000" },
        { name: "Voice on the phone", text: "Everything's fine, don't worry. Just a slight delay with the transfer. The weather was bad, so we're waiting for a vehicle now. ", color: "#bd0000" },
        { name: "Voice on the phone", text: "He'll definitely be in the city tomorrow or the day after.", color: "#bd0000" },
        { name: "Andrey", text: "A delay? He said his shift ended the day before yesterday...", color: "#000000" },
        { name: "Voice on the phone", text: "Well, things happen. You know it's not a resort here.", color: "#bd0000" },
        { name: "Voice on the phone", text: "The main thing is he's alive and well. Tell your family he'll be there soon.", color: "#bd0000" },
        { name: "Andrey", text: "Okay, thank you for the information. Goodbye.", color: "#000000" },
        { name: "Narrator", text: "Andrey hangs up, returns to the table, trying to look calm.", color: "#525252" },
        { name: "Andrey", text: "Everything's fine, they said there's a slight transportation delay. He'll be here soon.", color: "#000000" },
        { name: "Grandma", text: "Oh, as long as he's alive and well. The rest we can manage.", color: "#5900b3" },
    ];

    function showScene3() {
        console.log("Scene 3");
        nextButton = scene3.querySelector('.next-button');
        characterNameElement = scene3.querySelector('.character-name');
        characterContainer = scene3.querySelector('.character-container');
        character2Container = scene3.querySelector('.character2-container');
        dialogueElement = scene3.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm1");

        scene2.classList.remove('active');
        scene3.classList.add('active');

        if (scene3) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene3Data.length) {
                        isTyping = true;
                        const currentDialogue = scene3Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene3Data[currentDialogueIndex].text, scene3Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Voice on the phone") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }

                        if (currentDialogue.name == "Grandpa") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }

                    } else {
                        showScene4();
                        sound1.play();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene3');
        }
    }

    //  ------------------- SCENE 4 ---------------------

    const scene4Data = [
        { name: "", text: "", color: "" },
        { name: "Brother's voice", text: "Andrey... help... I'm scared... ", color: "#8f9100" },
        { name: "Andrey", text: "Dimka...", color: "#000000" },
        { name: "Andrey", text: "No, I can't just wait. Something's wrong.", color: "#000000" },
    ];

    function showScene4() {
        console.log("Scene 4");
        nextButton = scene4.querySelector('.next-button');
        characterNameElement = scene4.querySelector('.character-name');
        characterContainer = scene4.querySelector('.character-container');
        character2Container = scene4.querySelector('.character2-container');
        dialogueElement = scene4.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm2");

        scene3.classList.remove('active');
        scene4.classList.add('active');

        if (scene4) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene4Data.length) {
                        isTyping = true;
                        const currentDialogue = scene4Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene4Data[currentDialogueIndex].text, scene4Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Brother's voice") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }

                        if (currentDialogue.name == "") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }

                    } else {
                        showScene5();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene4');
        }
    }

    //  ------------------- SCENE 5 ---------------------

    const scene5Data = [
        { name: "", text: "", color: "" },
        { name: "Narrator", text: "Andrey is already dressed, getting ready to leave. His grandfather looks at him in surprise.", color: "#525252" },
        { name: "Grandpa", text: "Where are you off to so early, Andrey? The celebration isn't over yet.", color: "#2a00b3" },
        { name: "Andrey", text: "I'm sorry. I need to go.", color: "#000000" },
        { name: "Grandpa", text: "Go? Where? Did something happen?", color: "#2a00b3" },
        { name: "Andrey", text: "I dreamt about Dimka... A bad dream.", color: "#000000" },
        { name: "Andrey", text: "I can't sit here calmly. I'm going to check if he's okay.", color: "#000000" },
        { name: "Grandpa", text: "But the supervisor said they just had a delay...", color: "#2a00b3" },
        { name: "Andrey", text: "I know, but something's bothering me.", color: "#000000" },
        { name: "Andrey", text: "Can I take your car? Mine's in the shop.", color: "#000000" },
        { name: "Grandpa", text: "Take it, of course. Just be careful on the road.", color: "#2a00b3" },
        { name: "Grandpa", text: "And call me when you find out something.", color: "#2a00b3" },
        { name: "Andrey", text: "Definitely, Dad. Thanks.", color: "#000000" },
        { name: "Narrator", text: "Andrey quickly leaves the house and gets into the car.", color: "#525252" },
    ];

    function showScene5() {
        console.log("Scene 5");
        nextButton = scene5.querySelector('.next-button');
        characterNameElement = scene5.querySelector('.character-name');
        characterContainer = scene5.querySelector('.character-container');
        character2Container = scene5.querySelector('.character2-container');
        dialogueElement = scene5.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm3");

        scene4.classList.remove('active');
        scene5.classList.add('active');

        if (scene5) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene5Data.length) {
                        isTyping = true;
                        const currentDialogue = scene5Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene5Data[currentDialogueIndex].text, scene5Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Grandpa") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }

                        if (currentDialogue.name == "") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }

                    } else {
                        showScene6();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene5');
        }
    }

    //  ------------------- SCENE 6 ---------------------

    const scene6Data = [
        { name: "", text: "", color: "" },
        { name: "Andrey's Thoughts", text: "That dream... He looked so scared...", color: "#737373" },
        { name: "Andrey's Thoughts", text: "No, I have to check. Better safe than sorry.", color: "#737373" },
        { name: "Andrey's Thoughts", text: "Hang in there, Dimka. I'll be there soon...", color: "#737373" },
    ];

    function showScene6() {
        console.log("Scene 6");
        nextButton = scene6.querySelector('.next-button');
        characterNameElement = scene6.querySelector('.character-name');
        characterContainer = scene6.querySelector('.character-container');
        character2Container = scene6.querySelector('.character2-container');
        dialogueElement = scene6.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm3");

        scene5.classList.remove('active');
        scene6.classList.add('active');

        if (scene6) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene6Data.length) {
                        isTyping = true;
                        const currentDialogue = scene6Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene6Data[currentDialogueIndex].text, scene6Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });
                    } else {
                        showScene7();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene6');
        }
    }

    //  ------------------- SCENE 7 ---------------------

    const scene7Data = [
        { name: "", text: "", color: "" },
        { name: "Andrey", text: "Hello. I'm here for my brother, Dmitry Ivanov. He works here.", color: "#000000" },
        { name: "Narrator", text: "An old man in a sheepskin coat and earflap hat comes out of the guardhouse. His face is covered in wrinkles, his gaze seems empty but also piercing.", color: "#525252" },
        { name: "Filimon", text: "Ivanov... We have someone like that working here. And who are you to him?", color: "#946801" },
        { name: "Andrey", text: " I'm his brother, Andrey.", color: "#000000" },
        { name: "Andrey", text: "They told me he was supposed to be back from his shift, but he's still not here. I'm worried.", color: "#000000" },
        { name: "Filimon", text: "...", color: "#946801" },
        { name: "Filimon", text: "Worried, are you? ", color: "#946801" },
        { name: "Filimon", text: "That's your business.", color: "#946801" },
        { name: "Filimon", text: "But it's nighttime now. This is a restricted area. I can't just let you in.", color: "#946801" },
        { name: "Andrey", text: " I won't be long. Just need to find out where he is, if everything's okay.", color: "#000000" },
        { name: "Andrey", text: "I'd like to get in touch with him...", color: "#000000" },
        { name: "Narrator", text: "Filimon shakes his head", color: "#525252" },
        { name: "Filimon", text: "The connection here is bad. And as for 'where he is'... I can't tell you everything right now.", color: "#946801" },
        { name: "Filimon", text: "Come here, into the guardhouse. You must be freezing. Have some tea after your drive.", color: "#946801" },
        { name: "Narrator", text: "Filimon gestures for Andrey to get out of the car.", color: "#525252" },
        { name: "Andrey", text: "Thanks.", color: "#000000" },
        { name: "Narrator", text: "Andrey gets out of the car, watches the stern old man.", color: "#525252" },
    ];

    function showScene7() {
        console.log("Scene 7");
        nextButton = scene7.querySelector('.next-button');
        characterNameElement = scene7.querySelector('.character-name');
        characterContainer = scene7.querySelector('.character-container');
        character2Container = scene7.querySelector('.character2-container');
        dialogueElement = scene7.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm3");

        scene6.classList.remove('active');
        scene7.classList.add('active');

        if (scene7) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene7Data.length) {
                        isTyping = true;
                        const currentDialogue = scene7Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene7Data[currentDialogueIndex].text, scene7Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Filimon") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }

                        if (currentDialogue.name == "") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }

                    } else {
                        showScene8();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene7');
        }
    }

    //  ------------------- SCENE 8 ---------------------

    const scene8Data = [
        { name: "", text: "", color: "" },
        { name: "Narrator", text: "A small but warm guardhouse. It smells of tobacco and something simple, rural.", color: "#525252" },
        { name: "Narrator", text: "On the table is a well-worn kettle, some tools, and old newspapers.", color: "#525252" },
        { name: "Filimon", text: "Sit down, don't just stand there. I'll pour you some tea.", color: "#946801" },
        { name: "Filimon", text: "Has your brother been here long?", color: "#946801" },
        { name: "Andrey", text: "A few months. He got a job at this new drilling rig. Said it was very far away.", color: "#000000" },
        { name: "Filimon", text: "Yeah, it's a remote place. All sorts of things happen.", color: "#946801" },
        { name: "Narrator", text: "Filimon pours Andrey strong tea.", color: "#525252" },
        { name: "Filimon", text: "Drink up, warm yourself.", color: "#946801" },
        { name: "Andrey", text: "Thanks.", color: "#000000" },
        //player choices
        { name: "Andrey", text: "Filimon, you seem like you've been around here a long time. You must know how worrying it is when you can't reach family. Just any information would help.", color: "#000000" },
        { name: "Andrey", text: "I understand it's a restricted area, but my brother's well-being is my priority. If you can't tell me exactly where he is, can you at least confirm he's safe?", color: "#000000" },
        { name: "Andrey", text: "You're being very vague, Filimon. It's making me even more worried. Why can't you just tell me if he's here?", color: "#000000" },
        //choice line
        { name: "Andrey", text: "Listen, Filimon...", color: "#000000" },
        //answer lines
        { name: "Filimon", text: "Family's important, I know that. But rules are rules. And out here... things aren't always as they seem.", color: "#946801" },
        { name: "Filimon", text: "Safe is a relative word out here. He's... accounted for. For now. That's all I can say tonight.", color: "#946801" },
        { name: "Filimon", text: "I've told you what I can. Don't go making trouble where there isn't any. You're safe here for the night.", color: "#946801" },
        // -------------- 
        { name: "Andrey", text: "Maybe he stopped in some nearby village? I could drive there.", color: "#000000" },
        { name: "Filimon", text: "Where were you planning to spend the night? There are no hotels here. It's far to the city.", color: "#946801" },
        { name: "Andrey", text: "I'll figure something out. Maybe someone local will let me stay...", color: "#000000" },
        { name: "Filimon", text: "You've got no business wandering around here at night.", color: "#946801" },
        { name: "Filimon", text: "Stay with me. There's enough room. ", color: "#946801" },
        { name: "Filimon", text: " We'll sort things out in the morning.", color: "#946801" },
        //player choices
        { name: "Andrey", text: "I'm really grateful for your hospitality, Filimon, but I feel like I have to try and find out something today. It's very important to me.", color: "#000000" },
        { name: "Andrey", text: "Please, Filimon. My family is worried sick. If I go back with nothing, they'll be beside themselves. Just give me some hope for today.", color: "#000000" },
        { name: "Andrey", text: "Thanks, but I'm not sure I should stay here. Why are you insisting so much?", color: "#000000" },
        //choice line
        { name: "Andrey", text: "Listen, Filimon...", color: "#000000" },
        //answer lines
        { name: "Filimon", text: "I understand your worry. But I'm responsible for order here. I don't let anyone out at night.", color: "#946801" },
        { name: "Filimon", text: "Sentiments won't help here. There are rules. Everything will be clear in the morning.", color: "#946801" },
        { name: "Filimon", text: "I'm insisting because it's nighttime, and it's safe here. There's no need to make things up.", color: "#946801" },
        // -------------- 
        { name: "Filimon", text: "You're not going anywhere tonight.", color: "#946801" },
        { name: "Filimon", text: "The morning is wiser than the evening. Get some rest.", color: "#946801" },
        { name: "Andrey", text: "But why? What's going on? Do you know something?", color: "#000000" },
        { name: "Narrator", text: "Filimon looks away...", color: "#525252" },
        { name: "Filimon", text: "I don't know anything. I'm just saying what's best. It's nighttime.", color: "#946801" },
        //player choices
        { name: "Andrey", text: "But I can't just rest, Filimon! My brother is out there somewhere, maybe in trouble. Every minute counts!", color: "#000000" },
        { name: "Andrey", text: "But 'best' for whom, Filimon? Best for me to sit here and worry all night?", color: "#000000" },
        { name: "Andrey", text: "It feels like you do know something, Filimon. You're being awfully evasive. What aren't you telling me?", color: "#000000" },
        //choice line
        { name: "Andrey", text: "Listen, Filimon...", color: "#000000" },
        //answer lines
        { name: "Filimon", text: "A clear head in the morning will be more useful. ", color: "#946801" },
        { name: "Filimon", text: "Just trust me on this.", color: "#946801" },
        { name: "Filimon", text: "I told you, I don't know anything specific about your brother's delay.", color: "#946801" },
        // --------------
        { name: "Filimon", text: "It's dangerous to wander around here at night.", color: "#946801" },
        { name: "Andrey", text: "Dangerous? What could be dangerous here?", color: "#000000" },
        { name: "Narrator", text: "Filimon looks at Andrey again, something like weariness flashes in his eyes.", color: "#525252" },
        { name: "Filimon", text: "Sleep. The morning will show everything. ", color: "#946801" },
        //player choices
        { name: "Andrey", text: "Imagine if it were your brother. Wouldn't you want to know if he was okay?", color: "#000000" },
        { name: "Andrey", text: "If everything is alright, why isn't he in contact, and why can't you just say he's here?", color: "#000000" },
        { name: "Andrey", text: "Filimon, it seems to me you're hiding something. Why are you so unwilling to talk about my brother?", color: "#000000" },
        //choice line
        { name: "Andrey", text: "Filimon, I'm asking you, just tell me something!", color: "#000000" },
        //answer lines
        { name: "Narrator", text: "Filimon avoids direct eye contact.", color: "#525252" },
        { name: "Narrator", text: "He says this dryly, without emotion.", color: "#525252" },
        { name: "Narrator", text: "Filimon turns away, showing irritation.", color: "#525252" },
        // --------------
        { name: "Filimon", text: "We'll talk tomorrow.", color: "#946801" },
        { name: "Filimon", text: "And don't go running around here. It's a restricted area.", color: "#946801" },
        { name: "Narrator", text: "Filimon gets up and walks to a cot in the corner of the guardhouse, indicating that the conversation is over", color: "#525252" },
        { name: "Andrey's Thoughts", text: "What's going on here? Why won't he let me leave? What is he hiding?", color: "#737373" },
        //final choice
        { name: "Andrey's Thoughts", text: "I'll run away from Filimon and go look for Dimka!", color: "#737373" },
        { name: "Andrey's Thoughts", text: "I'll stay here for now.", color: "#737373" },
        { name: "Andrey's Thoughts", text: "I think I'd better listen to Philemon and stay with him for the night.", color: "#737373" },
        //choice line
        { name: "Andrey's Thoughts", text: "What should I do?", color: "#737373" },
    ];


    function showScene8() {
        console.log("Scene 8");
        playerReputation = filimonReputation;
        reputationValue = scene8.querySelector('.reputation-value');
        updateReputationDisplay(reputationValue);
        nextButton = scene8.querySelector('.next-button');
        characterNameElement = scene8.querySelector('.character-name');
        characterContainer = scene8.querySelector('.character-container');
        character2Container = scene8.querySelector('.character2-container');
        dialogueElement = scene8.querySelector('.dialogue');

        choicesContainer = scene8.querySelector('.choices');
        choiceButton1 = scene8.querySelector('.choice-button1');
        choiceButton2 = scene8.querySelector('.choice-button2');
        choiceButton3 = scene8.querySelector('.choice-button3');

        currentDialogueIndex = 0;
        playBgm("bgm3");

        scene7.classList.remove('active');
        scene8.classList.add('active');
        choicesContainer.classList.remove('active');

        if (scene8) {
            novelContainer.addEventListener('click', (event) => {
                if (event.target.classList.contains('choice-button1') || event.target.classList.contains('choice-button2') || event.target.classList.contains('choice-button3')) {
                    let reputationChange = parseInt(event.target.dataset.reputationChange);
                    if (reputationChange > 10) {
                        finalChoice = 1;
                    } else if (reputationChange < -10) {
                        finalChoice = 3;
                    } else {
                        finalChoice = 2;
                    }
                    changeReputation(reputationChange, reputationValue);
                    choicesContainer.classList.remove('active');
                    nextButton.classList.add('next-button');
                    updateReputationDisplay(reputationValue);
                }
            });

            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene8Data.length) {
                        let currentDialogue = scene8Data[currentDialogueIndex];

                        //Choices 1
                        if (currentDialogueIndex == 10) {
                            choicesContainer.classList.add('active');
                            nextButton.classList.remove('next-button');

                            choiceButton1.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene8Data[currentDialogueIndex];
                            choiceButton2.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene8Data[currentDialogueIndex];
                            choiceButton3.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                        }
                        if (currentDialogueIndex == 14) {
                            if (playerReputation >= 60) {
                                currentDialogueIndex += 0;
                            } else if (playerReputation >= 40) {
                                currentDialogueIndex += 1;
                            } else {
                                currentDialogueIndex += 2;
                            }
                        } else if (currentDialogueIndex >= 14 && currentDialogueIndex <= 16) {
                            currentDialogueIndex = 17;
                        }

                        //Choices 2
                        if (currentDialogueIndex == 23) {
                            choicesContainer.classList.add('active');
                            nextButton.classList.remove('next-button');

                            choiceButton1.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene8Data[currentDialogueIndex];
                            choiceButton2.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene8Data[currentDialogueIndex];
                            choiceButton3.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                        }
                        if (currentDialogueIndex == 27) {
                            if (playerReputation >= 60) {
                                currentDialogueIndex += 0;
                            } else if (playerReputation >= 40) {
                                currentDialogueIndex += 1;
                            } else {
                                currentDialogueIndex += 2;
                            }
                        } else if (currentDialogueIndex >= 27 && currentDialogueIndex <= 29) {
                            currentDialogueIndex = 30;
                        }

                        //Choices 3
                        if (currentDialogueIndex == 35) {
                            choicesContainer.classList.add('active');
                            nextButton.classList.remove('next-button');

                            choiceButton1.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene8Data[currentDialogueIndex];
                            choiceButton2.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene8Data[currentDialogueIndex];
                            choiceButton3.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                        }
                        if (currentDialogueIndex == 39) {
                            if (playerReputation >= 60) {
                                currentDialogueIndex += 0;
                            } else if (playerReputation >= 40) {
                                currentDialogueIndex += 1;
                            } else {
                                currentDialogueIndex += 2;
                            }
                        } else if (currentDialogueIndex >= 39 && currentDialogueIndex <= 41) {
                            currentDialogueIndex = 42;
                        }

                        //Choices 4
                        if (currentDialogueIndex == 46) {
                            choicesContainer.classList.add('active');
                            nextButton.classList.remove('next-button');

                            choiceButton1.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene8Data[currentDialogueIndex];
                            choiceButton2.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene8Data[currentDialogueIndex];
                            choiceButton3.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                        }
                        if (currentDialogueIndex == 50) {
                            if (playerReputation >= 60) {
                                currentDialogueIndex += 0;
                            } else if (playerReputation >= 40) {
                                currentDialogueIndex += 1;
                            } else {
                                currentDialogueIndex += 2;
                            }
                        } else if (currentDialogueIndex >= 50 && currentDialogueIndex <= 52) {
                            currentDialogueIndex = 53;
                        }

                        //Choices 5
                        if (currentDialogueIndex == 57) {
                            choicesContainer.classList.add('active');
                            nextButton.classList.remove('next-button');

                            choiceButton1.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene8Data[currentDialogueIndex];
                            choiceButton2.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene8Data[currentDialogueIndex];
                            choiceButton3.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                        }

                        isTyping = true;
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene8Data[currentDialogueIndex].text, scene8Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Filimon") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }

                        if (currentDialogue.name == "") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }

                    } else {
                        filimonReputation = playerReputation;
                        console.log("filimonReputation = " + filimonReputation);
                        console.log("finalChoice = " + finalChoice);
                        console.log("---------------------------------");
                        if (finalChoice == 1) {
                            showScene10();
                        } else {
                            showScene9();
                        }
                    }
                }
            });
        } else {
            console.error('not all elements exist scene8');
        }
    }

    //  ------------------- SCENE 9 ---------------------

    const scene9Data = [
        { name: "", text: "", color: "" },
        { name: "Narrator", text: "Andrey had to stay with Filimon all night. Despite Filimon's prohibition yesterday, finds the shift supervisor's house.", color: "#525252" },
        { name: "Narrator", text: "A sleepy man, disheveled and clearly displeased by the visit, opens the door.", color: "#525252" },
        { name: "Andrey", text: " Hello. Are you the shift supervisor at the drilling rig where Dmitry Ivanov works?", color: "#000000" },
        { name: "Shift Supervisor", text: "(yawning): Yeah, that's me.", color: "#bd0000" },
        { name: "Shift Supervisor", text: "What do you need so early? It's my day off.", color: "#bd0000" },
        { name: "Andrey", text: "I'm Dmitry's brother. He was supposed to return from his shift a few days ago, but he's still not back.", color: "#000000" },
        { name: "Andrey", text: "I'm worried.", color: "#000000" },
        { name: "Andrey", text: "Filimon at the checkpoint mentioned some kind of delay...", color: "#000000" },
        { name: "Shift Supervisor", text: "A delay is a delay. Why are you bothering me?", color: "#bd0000" },
        { name: "Shift Supervisor", text: "That's the kind of work we have, we don't live by a schedule. Your brother's alive and well. He'll be here soon.", color: "#bd0000" },
        //player choices
        { name: "Andrey", text: "I'm sorry to bother you. But you see, I'm really worried. Could you tell me more specifically what happened? Maybe there's something I can do to help?", color: "#000000" },
        { name: "Andrey", text: "Listen, 'soon' isn't an answer. I need to know for sure. Where is he now? Why can't I reach him?", color: "#000000" },
        { name: "Andrey", text: "I think you're hiding something. Filimon was acting strangely too. If something happened to my brother, I won't let this go.", color: "#000000" },
        //choice line
        { name: "Andrey", text: "...", color: "#000000" },
        //answer lines
        { name: "Shift Supervisor", text: "I understand you're worried. But like I said, it's just a transport issue. The weather out at the site was a real mess.", color: "#bd0000" },
        { name: "Shift Supervisor", text: "Hey, don't take that tone with me. I told you what I know. They're out at the work site, which is miles from anywhere with decent reception.", color: "#bd0000" },
        { name: "Shift Supervisor", text: "What are you implying? I don't know what you're talking about with Filimon. And don't come here making accusations. Everything is above board. You start causing trouble, and you'll regret it.", color: "#bd0000" },
        // -------------- 
        { name: "Andrey", text: "I'm really worried about my brother.", color: "#000000" },
        //player choices
        { name: "Andrey", text: "Could you please provide a more specific update on his status and expected return?", color: "#000000" },
        { name: "Andrey", text: "Please, you have to tell me something! My brother, Dmitry Ivanov, he was supposed to be back! Is he alright? Has something happened?", color: "#000000" },
        { name: "Andrey", text: "This 'delay' sounds convenient. What's really going on out there?", color: "#000000" },
        //choice line
        { name: "Andrey", text: "...", color: "#000000" },
        //answer lines
        { name: "Shift Supervisor", text: "We anticipate he'll be back as soon as the roads are clear.", color: "#bd0000" },
        { name: "Shift Supervisor", text: "Сalm down! I just told you, there's a delay. Everyone's fine, just waiting for transport. Stop panicking.", color: "#bd0000" },
        { name: "Shift Supervisor", text: "What are you implying? There's nothing 'going on' except a transportation issue. Don't come here with accusations.", color: "#bd0000" },
        // -------------- 
        { name: "Andrey", text: "...", color: "#000000" },
        { name: "Narrator", text: "Ring-ring-ring...", color: "#525252" },
        { name: "Narrator", text: "Suddenly, a sharp phone call rings.", color: "#525252" },
        { name: "Narrator", text: "The shift supervisor flinches and quickly walks deeper into the house, speaking into the phone.", color: "#525252" },
        { name: "Shift Supervisor", text: "Yeah? What is it now?...", color: "#bd0000" },
        { name: "Narrator", text: "The door to the room he goes into slams shut.", color: "#525252" },
        { name: "Narrator", text: "The slamming of the door unexpectedly turns on a nearby television.", color: "#525252" },
        { name: "Narrator", text: "An official emergency message from Zarechye appears on the screen.", color: "#525252" },
    ];

    function showScene9() {
        console.log("Scene 9");
        playerReputation = supervisorReputation;
        reputationValue = scene9.querySelector('.reputation-value');
        updateReputationDisplay(reputationValue);
        nextButton = scene9.querySelector('.next-button');
        characterNameElement = scene9.querySelector('.character-name');
        characterContainer = scene9.querySelector('.character-container');
        character2Container = scene9.querySelector('.character2-container');
        dialogueElement = scene9.querySelector('.dialogue');

        choicesContainer = scene9.querySelector('.choices');
        choiceButton1 = scene9.querySelector('.choice-button1');
        choiceButton2 = scene9.querySelector('.choice-button2');
        choiceButton3 = scene9.querySelector('.choice-button3');

        currentDialogueIndex = 0;
        playBgm("bgm4");

        scene8.classList.remove('active');
        scene10.classList.remove('active');
        scene9.classList.add('active');
        choicesContainer.classList.remove('active');

        if (scene9) {
            novelContainer.addEventListener('click', (event) => {
                if (event.target.classList.contains('choice-button1') || event.target.classList.contains('choice-button2') || event.target.classList.contains('choice-button3')) {
                    let reputationChange = parseInt(event.target.dataset.reputationChange);
                    changeReputation(reputationChange, reputationValue);
                    choicesContainer.classList.remove('active');
                    nextButton.classList.add('next-button');
                    updateReputationDisplay(reputationValue);
                }
            });

            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene9Data.length) {
                        let currentDialogue = scene9Data[currentDialogueIndex];

                        //Choices 1
                        if (currentDialogueIndex == 11) {
                            choicesContainer.classList.add('active');
                            nextButton.classList.remove('next-button');

                            choiceButton1.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene9Data[currentDialogueIndex];
                            choiceButton2.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene9Data[currentDialogueIndex];
                            choiceButton3.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                        }
                        if (currentDialogueIndex == 15) {
                            if (playerReputation >= 35) {
                                currentDialogueIndex += 0;
                            } else if (playerReputation >= 25) {
                                currentDialogueIndex += 1;
                            } else {
                                currentDialogueIndex += 2;
                            }
                        } else if (currentDialogueIndex >= 15 && currentDialogueIndex <= 17) {
                            currentDialogueIndex = 18;
                        }

                        //Choices 2
                        if (currentDialogueIndex == 19) {
                            choicesContainer.classList.add('active');
                            nextButton.classList.remove('next-button');

                            choiceButton1.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene9Data[currentDialogueIndex];
                            choiceButton2.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene9Data[currentDialogueIndex];
                            choiceButton3.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                        }
                        if (currentDialogueIndex == 23) {
                            if (playerReputation >= 40) {
                                currentDialogueIndex += 0;
                            } else if (playerReputation >= 25) {
                                currentDialogueIndex += 1;
                            } else {
                                currentDialogueIndex += 2;
                            }
                        } else if (currentDialogueIndex >= 23 && currentDialogueIndex <= 25) {
                            currentDialogueIndex = 26;
                        }

                        isTyping = true;
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene9Data[currentDialogueIndex].text, scene9Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Shift Supervisor") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }

                        if (currentDialogue.name == "") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }

                    } else {
                        supervisorReputation = playerReputation;
                        console.log("supervisorReputation = " + supervisorReputation);
                        playBgm(null);
                        showVideo();
                        //storyVideo.play();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene9');
        }
    }

    //  ------------------- SCENE 10 ---------------------

    const scene10Data = [
        { name: "", text: "", color: "" },
        { name: "Narrator", text: "Filimon, despite his age, moves surprisingly quickly, blocking his path.", color: "#525252" },
        { name: "Filimon", text: "You fool! Don't you understand? There are things out there you can't comprehend!", color: "#946801" },
    ];

    function showScene10() {
        console.log("Scene 10");
        nextButton = scene10.querySelector('.next-button');
        characterNameElement = scene10.querySelector('.character-name');
        characterContainer = scene10.querySelector('.character-container');
        character2Container = scene10.querySelector('.character2-container');
        dialogueElement = scene10.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm3");

        scene8.classList.remove('active');
        scene10.classList.add('active');

        if (scene10) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene10Data.length) {
                        isTyping = true;
                        const currentDialogue = scene10Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene10Data[currentDialogueIndex].text, scene10Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Filimon") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }

                        if (currentDialogue.name == "") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }

                    } else {
                        if (filimonReputation <= 50) {
                            showScene11();
                        } else {
                            showScene9();
                        }
                    }
                }
            });
        } else {
            console.error('not all elements exist scene7');
        }
    }

    //  ------------------- SCENE 11 --------------------- Death

    const scene11Data = [
        { name: "", text: "", color: "" },
        { name: "Andrey", text: "I don't care! I have to find him!", color: "#000000" },
        { name: "Narrator", text: "Andrey shoves Filimon aside, stumbles out of the guardhouse, and into the biting night.", color: "#525252" },
        { name: "Narrator", text: "The wind howls, carrying with it a strange, unsettling moan. Snow swirls around him, thick and blinding.", color: "#525252" },
        { name: "Narrator", text: "The darkness is oppressive, broken only by the weak glow of the gate lights. Andrey squints, trying to see through the blizzard.", color: "#525252" },
        { name: "Andrey", text: "Dimka! Dimka, are you out here?!", color: "#000000" },
        { name: "Narrator", text: "His voice is swallowed by the wind. The moaning sound grows louder, closer. Andrey feels a sudden, bone-chilling cold that seems to penetrate deeper than the winter air.", color: "#525252" },
        { name: "Narrator", text: "He sees a flicker of movement in the periphery, a tall, gaunt shape emerging from the swirling snow. Its eyes glow with an eerie, icy light. Andrey freezes, a primal fear gripping his heart.", color: "#525252" },
        { name: "Andrey", text: "What... what is that?", color: "#000000" },
        { name: "Narrator", text: "The figure glides towards him, impossibly fast. Its limbs are long and skeletal, its presence radiating an ancient, malevolent cold. Andrey tries to back away, but his feet are rooted to the ground.", color: "#525252" },
        { name: "Narrator", text: "A raspy, chilling voice whispers on the wind, seemingly coming from the figure itself.", color: "#525252" },
        { name: "Voice from the darkness", text: "You cannot escape the Winter's Night...", color: "#c20003" },
        { name: "Narrator", text: "Terror overwhelms Andrey. He tries to scream, but his voice catches in his throat. The gaunt figure reaches him, its touch like the embrace of death. A searing cold spreads through Andrey's body, his vision blurring.", color: "#525252" },
        { name: "Narrator", text: "He sees the glowing eyes up close, filled with a hunger that transcends mortal understanding. The last thing he feels is an agonizing cold and a sense of being utterly consumed by darkness.", color: "#525252" },
    ];

    function showScene11() {
        console.log("Scene 11");
        nextButton = scene11.querySelector('.next-button');
        characterNameElement = scene11.querySelector('.character-name');
        characterContainer = scene11.querySelector('.character-container');
        character2Container = scene11.querySelector('.character2-container');
        dialogueElement = scene11.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm2");

        scene10.classList.remove('active');
        scene11.classList.add('active');

        if (scene11) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene11Data.length) {
                        isTyping = true;
                        const currentDialogue = scene11Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene11Data[currentDialogueIndex].text, scene11Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }

                        if (currentDialogue.name == "Voice from the darkness") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }
                    } else {
                        console.log("1 = ");
                        playBgm("bgm5");
                        showSceneEnd();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene7');
        }
    }

    //  ------------------- VIDEO SCENE ---------------------
    function showVideo() {
        playBgm(null);
        storyVideo.volume = newVolume;
        if (videoScene) {
            console.log("2 = ");

            scene9.classList.remove('active');
            videoScene.classList.add('active');
            storyVideo.play();

            storyVideo.addEventListener('ended', () => {
                storyVideo.pause();
                showScene12();
            });
        }
        skipButton.addEventListener('click', () => {
            storyVideo.pause();
            showScene12();
        });
    }

    //  ------------------- SCENE 12 ---------------------

    const scene12Data = [
        { name: "", text: "", color: "" },
        { name: "Andrey", text: "My gut tells me Dimka's in trouble, and I'm wasting time here with people who aren't telling me the truth.", color: "#000000" },
        { name: "Andrey", text: "Stay here and ask more vague questions?", color: "#000000" },
        //player choices
        { name: "Andrey", text: "This warning... it could be about anything. I need to focus on finding my brother.", color: "#000000" },
        { name: "Andrey", text: "Trust these people who are clearly hiding something? No. Dimka needs me.", color: "#000000" },
        { name: "Andrey", text: "The locals might know more than this evasive supervisor. I need to stay and question them.", color: "#000000" },
        //choice line
        { name: "Andrey", text: "What should I do?", color: "#000000" },
        //answer lines
        { name: "Narrator", text: "Andrey ignores the warning and chooses to search for his brother in the taiga.", color: "#525252" },
        { name: "Narrator", text: "Andrey ignores the warning and chooses to search for his brother in the taiga.", color: "#525252" },
        { name: "Narrator", text: "Andrey is frightened by the warning and initially decides to stay in the village to seek information from the locals.", color: "#525252" },
        // -------------- 
        { name: "Andrey", text: "Okay, I made my choice.", color: "#000000" },
    ];

    function showScene12() {
        console.log("Scene 12");
        playerReputation = supervisorReputation;
        reputationValue = scene12.querySelector('.reputation-value');
        updateReputationDisplay(reputationValue);
        nextButton = scene12.querySelector('.next-button');
        characterNameElement = scene12.querySelector('.character-name');
        characterContainer = scene12.querySelector('.character-container');
        character2Container = scene12.querySelector('.character2-container');
        dialogueElement = scene12.querySelector('.dialogue');

        choicesContainer = scene12.querySelector('.choices');
        choiceButton1 = scene12.querySelector('.choice-button1');
        choiceButton2 = scene12.querySelector('.choice-button2');
        choiceButton3 = scene12.querySelector('.choice-button3');

        currentDialogueIndex = 0;
        playBgm("bgm4");

        videoScene.classList.remove('active');
        scene12.classList.add('active');
        choicesContainer.classList.remove('active');

        if (scene12) {
            novelContainer.addEventListener('click', (event) => {
                if (event.target.classList.contains('choice-button1') || event.target.classList.contains('choice-button2') || event.target.classList.contains('choice-button3')) {
                    let reputationChange = parseInt(event.target.dataset.reputationChange);
                    changeReputation(reputationChange, reputationValue);
                    choicesContainer.classList.remove('active');
                    nextButton.classList.add('next-button');
                    updateReputationDisplay(reputationValue);

                    if (reputationChange > 7) {
                        finalChoice = 1;
                    } else if (reputationChange < -7) {
                        finalChoice = 3;
                    } else {
                        finalChoice = 2;
                    }
                }
            });

            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene12Data.length) {
                        let currentDialogue = scene12Data[currentDialogueIndex];

                        //Choices 1
                        if (currentDialogueIndex == 3) {
                            choicesContainer.classList.add('active');
                            nextButton.classList.remove('next-button');

                            choiceButton1.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene12Data[currentDialogueIndex];
                            choiceButton2.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene12Data[currentDialogueIndex];
                            choiceButton3.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                        }
                        if (currentDialogueIndex == 7) {
                            if (finalChoice == 1) {
                                currentDialogueIndex += 0;
                            } else if (finalChoice == 2) {
                                currentDialogueIndex += 1;
                            } else {
                                currentDialogueIndex += 2;
                            }
                        } else if (currentDialogueIndex >= 7 && currentDialogueIndex <= 9) {
                            currentDialogueIndex = 10;
                        }

                        isTyping = true;
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene12Data[currentDialogueIndex].text, scene12Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }

                        if (currentDialogue.name == "") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }

                    } else {
                        supervisorReputation = playerReputation;
                        if (supervisorReputation >= 50) {
                            showScene13();
                        } else {
                            showScene14();
                        }
                    }
                }
            });
        } else {
            console.error('not all elements exist scene9');
        }
    }

    //  ------------------- SCENE 13 ---------------------

    const scene13Data = [
        { name: "", text: "", color: "" },
        { name: "Shift Supervisor", text: "Look, Ivanov... you seem genuinely worried.", color: "#bd0000" },
        { name: "Shift Supervisor", text: "That call... it wasn't exactly about the transport delay.", color: "#bd0000" },
        { name: "Andrey", text: "What was it? Is something wrong?", color: "#000000" },
        { name: "Shift Supervisor", text: "Let's just say things out at the old logging camp... where they were initially setting up... aren't as straightforward as they seem.", color: "#bd0000" },
        { name: "Shift Supervisor", text: "Your brother... he might have gone there.", color: "#bd0000" },
        { name: "Narrator", text: "Shift Supervisor pulls a roughly drawn map from a drawer. He points to a marked location.", color: "#525252" },
        { name: "Inventory", text: "You have received the item: logging camp map", color: "#268000" },
        { name: "Shift Supervisor", text: "This is the old logging camp. It's about twenty kilometers north, off the main road.", color: "#bd0000" },
        { name: "Shift Supervisor", text: "Be careful, the roads are rough. I probably shouldn't be doing this... but... family is family.", color: "#bd0000" },
        { name: "Andrey", text: "Thank you! Thank you so much!", color: "#000000" },
        { name: "Andrey", text: "I don't know how to repay you.", color: "#000000" },
        { name: "Shift Supervisor", text: "Just... be discreet. And be careful out there. If anyone asks, you heard nothing from me.", color: "#bd0000" },
    ];

    function showScene13() {
        console.log("Scene 13");
        map = true;
        console.log("map = " + map);
        playerReputation = supervisorReputation;
        reputationValue = scene13.querySelector('.reputation-value');
        updateReputationDisplay(reputationValue);
        nextButton = scene13.querySelector('.next-button');
        characterNameElement = scene13.querySelector('.character-name');
        characterContainer = scene13.querySelector('.character-container');
        character2Container = scene13.querySelector('.character2-container');
        dialogueElement = scene13.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm4");

        scene12.classList.remove('active');
        scene13.classList.add('active');

        if (scene13) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene13Data.length) {
                        isTyping = true;
                        const currentDialogue = scene13Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene13Data[currentDialogueIndex].text, scene13Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Shift Supervisor") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }

                        if (currentDialogue.name == "Inventory") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }

                    } else {
                        if (finalChoice == 1 || finalChoice == 2) {
                            showScene15();
                        } else {
                            showScene23();
                        }
                    }
                }
            });
        } else {
            console.error('not all elements exist scene13');
        }
    }

    //  ------------------- SCENE 14 ---------------------

    const scene14Data = [
        { name: "", text: "", color: "" },
        { name: "Shift Supervisor", text: "Listen, I'm done with this. Whatever your brother's gotten himself into is his business. And frankly, your attitude isn't helping.", color: "#bd0000" },
        { name: "Andrey", text: "But I need to find him!", color: "#000000" },
        { name: "Shift Supervisor", text: "Not my problem. I told you there was a delay. ", color: "#bd0000" },
        { name: "Shift Supervisor", text: "Now, I've got real work to do. You need to leave.", color: "#bd0000" },
        { name: "Narrator", text: "The Shift Supervisor opens the door and gestures forcefully for Andrey to exit.", color: "#525252" },
        { name: "Andrey", text: "You can't just kick me out!", color: "#000000" },
        { name: "Shift Supervisor", text: "I can and I will. You're disrupting things here. Get out. And don't come back.", color: "#bd0000" },
    ];

    function showScene14() {
        console.log("Scene 14");
        map = false;
        console.log("map = " + map);
        playerReputation = supervisorReputation;
        reputationValue = scene14.querySelector('.reputation-value');
        updateReputationDisplay(reputationValue);
        nextButton = scene14.querySelector('.next-button');
        characterNameElement = scene14.querySelector('.character-name');
        characterContainer = scene14.querySelector('.character-container');
        character2Container = scene14.querySelector('.character2-container');
        dialogueElement = scene14.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm4");

        scene12.classList.remove('active');
        scene14.classList.add('active');

        if (scene14) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene14Data.length) {
                        isTyping = true;
                        const currentDialogue = scene14Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene14Data[currentDialogueIndex].text, scene14Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Shift Supervisor") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }
                    } else {
                        if (finalChoice == 1 || finalChoice == 2) {
                            showScene15();
                        } else {
                            showScene23();
                        }
                    }
                }
            });
        } else {
            console.error('not all elements exist scene14');
        }
    }


    //  ------------------- SCENE 15 ---------------------

    const scene15Data = [
        { name: "", text: "", color: "" },
        { name: "Andrey", text: "Excuse me, but I can't just sit here and wait.", color: "#000000" },
        { name: "Andrey", text: "I'm going to search for my brother.", color: "#000000" },
        { name: "Andrey", text: "Dimka mentioned an old sawmill... about five kilometers north of here.", color: "#000000" },
        { name: "Andrey", text: "Said they had a temporary camp there while they were setting up the drilling rig.", color: "#000000" },
        { name: "Andrey", text: "But that was a while ago.", color: "#000000" },
        { name: "Andrey", text: "That's something at least.", color: "#000000" },
        { name: "Andrey", text: "Dimka, hang in there. I'm coming. Just need to find this damn sawmill.", color: "#000000" },
        { name: "Narrator", text: "5 hours later.", color: "#525252" },
        { name: "Andrey", text: "It gets dark quickly here, though.", color: "#000000" },
        { name: "Andrey", text: "It's getting colder. Filimon wasn't kidding about the night. Hope I find something before dark.", color: "#000000" },
    ];

    function showScene15() {
        console.log("Scene 15");
        nextButton = scene15.querySelector('.next-button');
        characterNameElement = scene15.querySelector('.character-name');
        characterContainer = scene15.querySelector('.character-container');
        character2Container = scene15.querySelector('.character2-container');
        dialogueElement = scene15.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm3");

        scene13.classList.remove('active');
        scene14.classList.remove('active');
        scene15.classList.add('active');

        if (scene15) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene15Data.length) {
                        isTyping = true;
                        const currentDialogue = scene15Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene15Data[currentDialogueIndex].text, scene15Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }

                    } else {
                        if (map == true) {
                            showScene16();
                        } else {
                            showScene17();
                        }
                    }
                }
            });
        } else {
            console.error('not all elements exist scene7');
        }
    }

    //  ------------------- SCENE 16 ---------------------

    const scene16Data = [
        { name: "", text: "", color: "" },
        { name: "Andrey", text: "Damn it, which way is north anyway? Everything looks the same", color: "#000000" },
        { name: "Andrey", text: "This has to be the right direction... Dimka said north... five kilometers... feels like I've walked twice that already.", color: "#000000" },
        { name: "Andrey", text: "It's a good thing the Shift Supervisor gave me a map.", color: "#000000" },
        { name: "Andrey", text: "If I hadn't been so polite to him, he would never have given it to me.", color: "#000000" },
        { name: "Andrey", text: "I'll be able to find Dimka's shelter before nightfall.", color: "#000000" },
        { name: "Inventory", text: "Andrey takes out the map and studies it intently.", color: "#268000" },
        { name: "Andrey", text: "I know where to go! Hang in there, Dimka, I'll be there soon.", color: "#000000" },
    ];

    function showScene16() {
        console.log("Scene 16");
        nextButton = scene16.querySelector('.next-button');
        characterNameElement = scene16.querySelector('.character-name');
        characterContainer = scene16.querySelector('.character-container');
        character2Container = scene16.querySelector('.character2-container');
        dialogueElement = scene16.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm3");

        scene15.classList.remove('active');
        scene16.classList.add('active');

        if (scene16) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene16Data.length) {
                        isTyping = true;
                        const currentDialogue = scene16Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene16Data[currentDialogueIndex].text, scene16Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Inventory") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }

                    } else {
                        showScene19();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene7');
        }
    }

    //  ------------------- SCENE 17 ---------------------

    const scene17Data = [
        { name: "", text: "", color: "" },
        { name: "Andrey", text: "Damn it, which way is north anyway? Everything looks the same", color: "#000000" },
        { name: "Andrey", text: "This has to be the right direction... Dimka said north... five kilometers... feels like I've walked twice that already.", color: "#000000" },
        { name: "Andrey", text: "It's a pity that the supervisor didn't give me a map.", color: "#000000" },
        { name: "Andrey", text: "If only I had been a little more polite to him...", color: "#000000" },
        { name: "Andrey", text: "Wait... are those tracks? Too faint to tell if they're recent... or the right size.", color: "#000000" },
        { name: "Andrey", text: "Broken branch... looks like it was snapped recently. Could someone have passed this way?", color: "#000000" },
        { name: "Narrator", text: "Andrey remembers that he has a couple of photographs that Dimka sent as soon as he arrived for his shift.", color: "#525252" },
        { name: "Inventory", text: "Andrey hurriedly pulls out the photographs.", color: "#268000" },
        { name: "Andrey", text: "I urgently need to find at least some kind of similar place, otherwise I'll be left wandering around here until nightfall.", color: "#000000" },
    ];

    function showScene17() {
        console.log("Scene 17");
        nextButton = scene17.querySelector('.next-button');
        characterNameElement = scene17.querySelector('.character-name');
        characterContainer = scene17.querySelector('.character-container');
        character2Container = scene17.querySelector('.character2-container');
        dialogueElement = scene17.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm6");

        scene15.classList.remove('active');
        scene17.classList.add('active');

        if (scene17) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene17Data.length) {
                        isTyping = true;
                        const currentDialogue = scene17Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene17Data[currentDialogueIndex].text, scene17Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Inventory") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }

                    } else {
                        showGame1();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene17');
        }
    }

    //  ------------------- MINI GAME 1 ---------------------

    function showGame1() {
        scene17.classList.remove('active');
        game1.classList.add('active');
        console.log("Game 1");
        playBgm("bgm6");
        startGame();
    }

    const gameArea = document.querySelector('.game-area');
    const timerDisplay = document.getElementById('time');
    const foundDisplay = document.getElementById('found');
    const items = document.querySelectorAll('.item');

    let timeLeft = 60;
    let foundCount = 0;
    let gameInterval;

    function startGame() {
        items.forEach(item => {
            item.addEventListener('click', handleItemClick);
        });

        gameInterval = setInterval(updateTimer, 1000);
    }

    function handleItemClick(event) {
        const clickedItem = event.target;
        if (clickedItem.dataset.found === 'false') {
            clickedItem.dataset.found = 'true';
            clickedItem.classList.add('found');
            foundCount++;
            foundDisplay.textContent = `${foundCount} / 5`;

            if (foundCount === 5) {
                game1Win();
            }
        }
    }

    function updateTimer() {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            game1Over();
        }
    }

    function game1Win() {
        clearInterval(gameInterval);
        showScene19();
    }

    function game1Over() {
        clearInterval(gameInterval);
        showScene18();
    }

    //  ------------------- SCENE 18 ---------------------

    const scene18Data = [
        { name: "", text: "", color: "" },
        { name: "Andrey", text: "Damn it! I'm lost. Utterly and completely lost.", color: "#000000" },
        { name: "Narrator", text: "The sun's going down so fast... I can't see anything anymore. What am I going to do?", color: "#525252" },
        { name: "Narrator", text: "The wind howls, carrying with it a strange, unsettling moan. Snow swirls around him, thick and blinding.", color: "#525252" },
        { name: "Narrator", text: "The darkness is oppressive, broken only by the weak glow of the gate lights. Andrey squints, trying to see through the blizzard.", color: "#525252" },
        { name: "Andrey", text: "Dimka! Dimka, are you out here?!", color: "#000000" },
        { name: "Narrator", text: "His voice is swallowed by the wind. The moaning sound grows louder, closer. Andrey feels a sudden, bone-chilling cold that seems to penetrate deeper than the winter air.", color: "#525252" },
        { name: "Narrator", text: "He sees a flicker of movement in the periphery, a tall, gaunt shape emerging from the swirling snow. Its eyes glow with an eerie, icy light. Andrey freezes, a primal fear gripping his heart.", color: "#525252" },
        { name: "Andrey", text: "What... what is that?", color: "#000000" },
        { name: "Narrator", text: "The figure glides towards him, impossibly fast. Its limbs are long and skeletal, its presence radiating an ancient, malevolent cold. Andrey tries to back away, but his feet are rooted to the ground.", color: "#525252" },
        { name: "Narrator", text: "A raspy, chilling voice whispers on the wind, seemingly coming from the figure itself.", color: "#525252" },
        { name: "Voice from the darkness", text: "You cannot escape the Winter's Night...", color: "#c20003" },
        { name: "Narrator", text: "Terror overwhelms Andrey. He tries to scream, but his voice catches in his throat. The gaunt figure reaches him, its touch like the embrace of death. A searing cold spreads through Andrey's body, his vision blurring.", color: "#525252" },
        { name: "Narrator", text: "He sees the glowing eyes up close, filled with a hunger that transcends mortal understanding. The last thing he feels is an agonizing cold and a sense of being utterly consumed by darkness.", color: "#525252" },
    ];

    function showScene18() {
        console.log("Scene 18");
        nextButton = scene18.querySelector('.next-button');
        characterNameElement = scene18.querySelector('.character-name');
        characterContainer = scene18.querySelector('.character-container');
        character2Container = scene18.querySelector('.character2-container');
        dialogueElement = scene18.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm2");

        game1.classList.remove('active');
        scene18.classList.add('active');

        if (scene18) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene18Data.length) {
                        isTyping = true;
                        const currentDialogue = scene18Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene18Data[currentDialogueIndex].text, scene18Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }

                        if (currentDialogue.name == "Voice from the darkness") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }
                    } else {
                        playBgm("bgm5");
                        showSceneEnd();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene 8');
        }
    }

    //  ------------------- SCENE 19 ---------------------

    const scene19Data = [
        { name: "", text: "", color: "" },
        { name: "Andrey", text: "Yes! Yes, that's it! The crooked birch tree... I remember that!", color: "#000000" },
        { name: "Andrey", text: "I think... I think I'm on the right track! Finally!", color: "#000000" },
        { name: "Andrey", text: "Just a little further... I can feel it. I'm close.", color: "#000000" },
        { name: "Andrey", text: "That's it! The shape of the roof... the boarded-up window... it has to be it!", color: "#000000" },
        { name: "Andrey", text: " Dimka! Dimka, are you there?!", color: "#000000" },
        { name: "Andrey", text: "The door... it looks... not locked?", color: "#000000" },
        { name: "Narrator", text: "Andrey goes inside the hut", color: "#525252" },
    ];

    function showScene19() {
        console.log("Scene 19");
        nextButton = scene19.querySelector('.next-button');
        characterNameElement = scene19.querySelector('.character-name');
        characterContainer = scene19.querySelector('.character-container');
        character2Container = scene19.querySelector('.character2-container');
        dialogueElement = scene19.querySelector('.dialogue');

        currentDialogueIndex = 0;

        scene16.classList.remove('active');
        game1.classList.remove('active');
        scene19.classList.add('active');

        if (scene19) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene19Data.length) {
                        isTyping = true;
                        const currentDialogue = scene19Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene19Data[currentDialogueIndex].text, scene19Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });
                    } else {
                        showScene20();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene 19');
        }
    }

    //  ------------------- SCENE 20 ---------------------

    const scene20Data = [
        { name: "", text: "", color: "" },
        { name: "Dimka", text: "Andrey?", color: "#00574f" },
        { name: "Dimka", text: "You... how did you find me?", color: "#00574f" },
        { name: "Andrey", text: "It doesn't matter. What happened? Why are you here?", color: "#000000" },
        { name: "Dimka", text: "It's... it's hard to explain. Something strange is going on at the drilling rig...", color: "#00574f" },
        { name: "Dimka", text: "...The shift supervisor... he's become different. And Filimon is strange...", color: "#00574f" },
        { name: "Dimka", text: "They're hiding something. I tried to leave, but they wouldn't let me.", color: "#00574f" },
        { name: "Dimka", text: "Said I had to stay until the work was done... some special work...", color: "#00574f" },
        { name: "Andrey", text: "Special work? What kind? ", color: "#000000" },
        { name: "Dimka", text: " I don't know. But I feel like something's wrong. And then I saw...", color: "#00574f" },
        { name: "Narrator", text: "Dmitry stumbles, his eyes full of horror", color: "#525252" },
        { name: "Dimka", text: "...saw something in the forest... scary...", color: "#00574f" },
        { name: "Dimka", text: " It was watching us.", color: "#00574f" },
        { name: "Andrey", text: "Karachun? The thing they showed on TV? ", color: "#000000" },
        { name: "Dimka", text: "Seems like... ", color: "#00574f" },
        { name: "Dimka", text: "It took several workers.", color: "#00574f" },
        { name: "Dimka", text: "The boss said they went missing...", color: "#00574f" },
        { name: "Dimka", text: "But I saw...", color: "#00574f" },
        { name: "Andrey", text: "We need to get out of here.", color: "#000000" },
        { name: "Andrey", text: "We'll wait until morning and then immediately run after the car.", color: "#000000" },
    ];

    function showScene20() {
        console.log("Scene 20");
        nextButton = scene20.querySelector('.next-button');
        characterNameElement = scene20.querySelector('.character-name');
        characterContainer = scene20.querySelector('.character-container');
        character2Container = scene20.querySelector('.character2-container');
        dialogueElement = scene20.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm1");

        scene19.classList.remove('active');
        scene20.classList.add('active');

        if (scene20) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene20Data.length) {
                        isTyping = true;
                        const currentDialogue = scene20Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene20Data[currentDialogueIndex].text, scene20Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Dimka") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }
                    } else {
                        if (supervisorReputation >= 50) {
                            showScene21();
                        } else {
                            showScene22();
                        }
                    }
                }
            });
        } else {
            console.error('not all elements exist scene 20');
        }
    }

    //  ------------------- SCENE 21 ---------------------

    const scene21Data = [
        { name: "", text: "", color: "" },
        { name: "Dimka", text: "I can't believe we're actually out of there, Andrey. I thought I was going to freeze solid in that shack.", color: "#00574f" },
        { name: "Andrey", text: "Me neither, bro. That was way too close. Just a little further, and we'll be back to home, to warmth... and real food.", color: "#000000" },
        { name: "Dimka", text: " Real food... man, that sounds like a dream. And no more creepy shadows or that constant feeling of being watched.", color: "#00574f" },
        { name: "Andrey", text: "Tell me about it. That whole place gave me the creeps.", color: "#000000" },
        { name: "Andrey", text: "But hey, at least the Shift Supervisor eventually gave me that map, right?", color: "#000000" },
        { name: "Andrey", text: "Without it, we'd still be wandering around out there.", color: "#000000" },
        { name: "Dimka", text: "Eventually. Only after you practically cornered him.", color: "#00574f" },
        { name: "Dimka", text: "And he still looked like he was hiding something. You really think he's just an okay guy?", color: "#00574f" },
        { name: "Andrey", text: "Look, he was probably just stressed out, dealing with whatever weird stuff is happening out at that rig.", color: "#000000" },
        { name: "Andrey", text: "Maybe the bad weather really messed things up.", color: "#000000" },
        { name: "Andrey", text: "He didn't have to give me the map. He could have just brushed me off like Filimon almost did.", color: "#000000" },
        { name: "Dimka", text: "But the way he acted... and Filimon too! They were both so cagey.", color: "#00574f" },
        { name: "Dimka", text: "And what about those missing workers I told you about? The supervisor just said they 'went missing.' That doesn't sound right.", color: "#00574f" },
        { name: "Andrey", text: "Look, I know it was strange, but we're safe now. ", color: "#000000" },
        { name: "Andrey", text: "Let's just be grateful for that. Maybe there's a perfectly normal explanation for everything. ", color: "#000000" },
        { name: "Andrey", text: "Some companies are just tight-lipped about their operations.", color: "#000000" },
        { name: "Dimka", text: "I don't know, Andrey... it just doesn't feel right.", color: "#00574f" },
        { name: "Andrey", text: " I know, but for now, let's just be glad we're together and heading home.", color: "#000000" },
        { name: "Andrey", text: "We can think about all the weirdness later, once we're warm and safe. Deal?", color: "#000000" },
        { name: "Dimka", text: "Deal. But I'm not forgetting about this.", color: "#00574f" },
        { name: "Andrey", text: "Fair enough. But for now... let's just enjoy the walk home.", color: "#000000" },
        { name: "Narrator", text: "They continue driving in silence for a moment, the relief of their escape slowly starting to outweigh the lingering unease about what they left behind.", color: "#525252" },
        { name: "Narrator", text: "Andrey hopes he's convinced Dimka to let it go, at least for now.", color: "#525252" },
    ];

    function showScene21() {
        console.log("Scene 21");
        nextButton = scene21.querySelector('.next-button');
        characterNameElement = scene21.querySelector('.character-name');
        characterContainer = scene21.querySelector('.character-container');
        character2Container = scene21.querySelector('.character2-container');
        dialogueElement = scene21.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm7");

        scene20.classList.remove('active');
        scene21.classList.add('active');

        if (scene21) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene21Data.length) {
                        isTyping = true;
                        const currentDialogue = scene21Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene21Data[currentDialogueIndex].text, scene21Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Dimka") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }
                    } else {
                        showSceneEndNeutral();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene 21');
        }
    }

    //  ------------------- SCENE 22 ---------------------

    const scene22Data = [
        { name: "", text: "", color: "" },
        { name: "Dimka", text: "You're awfully quiet, Andrey. Still thinking about that creepy hut?", color: "#00574f" },
        { name: "Andrey", text: "More about the guy who didn't want you to leave it.", color: "#000000" },
        { name: "Andrey", text: "The Shift Supervisor.", color: "#000000" },
        { name: "Dimka", text: "What about him?", color: "#00574f" },
        { name: "Andrey", text: "Something about him didn't sit right with me, Dimka. All those vague answers, the way he avoided looking me in the eye...", color: "#000000" },
        { name: "Dimka", text: "You think he knew more than he let on? About... everything?", color: "#00574f" },
        { name: "Andrey", text: "I don't know what he knew, but I'm betting it was more than just a transport delay.", color: "#000000" },
        { name: "Andrey", text: "And that phone call he took? He seemed really agitated.", color: "#000000" },
        { name: "Andrey", text: "It wasn't about the weather, I'd stake money on it.", color: "#000000" },
        { name: "Dimka", text: "So, what are you thinking?", color: "#00574f" },
        { name: "Andrey", text: " I'm thinking we shouldn't just head straight back to home. I want to go back to the village first.", color: "#000000" },
        { name: "Dimka", text: "Back to the village? Why? We need to get warm and tell everyone you found me.", color: "#00574f" },
        { name: "Andrey", text: "We will. But I have this nagging feeling. Filimon was weird, the supervisor was weird... and that emergency broadcast on TV? It all feels connected somehow.", color: "#000000" },
        { name: "Narrator", text: "They change direction, a new determination hardening Andrey's gaze as they head back towards the village, intent on uncovering the truth behind the strange events.", color: "#525252" },
    ];

    function showScene22() {
        console.log("Scene 22");
        nextButton = scene22.querySelector('.next-button');
        characterNameElement = scene22.querySelector('.character-name');
        characterContainer = scene22.querySelector('.character-container');
        character2Container = scene22.querySelector('.character2-container');
        dialogueElement = scene22.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm3");

        scene20.classList.remove('active');
        scene22.classList.add('active');

        if (scene22) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene22Data.length) {
                        isTyping = true;
                        const currentDialogue = scene22Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene22Data[currentDialogueIndex].text, scene22Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });
                    } else {
                        showScene23();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene 22');
        }
    }

    //  ------------------- SCENE 23 ---------------------

    const scene23Data = [
        { name: "", text: "", color: "" },
        { name: "Narrator", text: "Andrey approaches woman, Anna, who is sweeping the porch of her small, weathered house. He tries to look casual.", color: "#525252" },
        { name: "Andrey", text: "Good afternoon. Sorry to bother you.", color: "#000000" },
        { name: "Anna", text: "(Looks up, her eyes a little wary) Hello.", color: "#6e005b" },
        { name: "Andrey", text: "It's quiet and beautiful around here. Have you lived here long?", color: "#000000" },
        { name: "Anna", text: "My whole life. My grandparents lived here. The place might be beautiful, but things are uneasy lately.", color: "#6e005b" },
        { name: "Andrey", text: "Uneasy? What happened? It just seemed like people were a bit... pensive.", color: "#000000" },
        { name: "Anna", text: "All sorts of things happen. Best not to ask, kind man. What you don't know won't hurt you.", color: "#6e005b" },
        { name: "Andrey", text: "I understand. It's just... I've heard things about strange weather... sudden blizzards...", color: "#000000" },
        { name: "Anna", text: "The weather is what it is. Sometimes sun, sometimes a blizzard. We're used to it.", color: "#6e005b" },
        { name: "Andrey", text: "And... I also heard that people see things in the forest... you know, local legends, probably? About forest spirits and such...", color: "#000000" },
        { name: "Anna", text: "The forest is big. All sorts of things can seem real in the forest. People have vivid imaginations.", color: "#6e005b" },
        { name: "Anna", text: "You have to be careful during that time.", color: "#6e005b" },
        { name: "Andrey", text: "Careful? Because of the cold, I suppose?", color: "#000000" },
        { name: "Anna", text: "Not just the cold, young man. There are things scarier than frost. But those are old stories. Don't mind them.", color: "#6e005b" },
        { name: "Andrey", text: "I see. Thank you for the chat. Have a good day.", color: "#000000" },
        { name: "Anna", text: "You too. And watch your step. All sorts of things happen.", color: "#6e005b" },
        { name: "Narrator", text: "Andrey walked slowly through the village, his eyes scanning the faces of the few people he encountered.", color: "#525252" },
        { name: "Narrator", text: "He tried to strike up a few more conversations, asking casual questions about the weather and the surrounding area, but the responses were short and unrevealing.", color: "#525252" },
        { name: "Narrator", text: "A sense of unease settled in his stomach. It felt like the village held its breath, guarding a secret he couldn't quite grasp.", color: "#525252" },
        { name: "Narrator", text: "Just as he was starting to feel like he'd hit a dead end, an old woman sitting on a bench outside a particularly crooked house beckoned him over with a gnarled finger.", color: "#525252" },
        { name: "Taisiya", text: "Young man. Come here.", color: "#306e00" },
        { name: "Narrator", text: "Andrey hesitated, looking around. There was no one else nearby. He cautiously approached the old woman.", color: "#525252" },
        { name: "Taisiya", text: "You, you. No need to wander around here lost. Come to me.", color: "#306e00" },
        { name: "Taisiya", text: "We haven't been acquainted yet. But I know who you are. And I know why you've come to our lands.", color: "#306e00" },
        { name: "Taisiya", text: "Don't waste time on empty words. Come into my house. We'll have a heart-to-heart. I have what you're looking for.", color: "#306e00" },
        { name: "Narrator", text: "She gestured towards the door of her crooked house.", color: "#525252" },
        { name: "Narrator", text: "Andrey felt a shiver run down his spine. This old woman... she knew. He had no idea how, but he felt compelled to follow her.", color: "#525252" },
    ];

    function showScene23() {
        console.log("Scene 23");
        nextButton = scene23.querySelector('.next-button');
        characterNameElement = scene23.querySelector('.character-name');
        characterContainer = scene23.querySelector('.character-container');
        character2Container = scene23.querySelector('.character2-container');
        dialogueElement = scene23.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm3");

        scene13.classList.remove('active');
        scene14.classList.remove('active');
        scene22.classList.remove('active');
        scene23.classList.add('active');

        if (scene23) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene23Data.length) {
                        isTyping = true;
                        const currentDialogue = scene23Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene23Data[currentDialogueIndex].text, scene23Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Anna") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }
                        if (currentDialogue.name == "Taisiya") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }
                    } else {
                        showScene24();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene 23');
        }
    }

    //  ------------------- SCENE 24 ---------------------

    const scene24Data = [
        { name: "", text: "", color: "" },
        { name: "Taisiya", text: " So, young man, you seek your brother. Dmitry, was it? The one who toils at the cursed drilling site.", color: "#306e00" },
        { name: "Andrey", text: "Cursed? What do you mean?", color: "#000000" },
        { name: "Taisiya", text: "That place... it has awakened something ancient, something dark.", color: "#306e00" },
        { name: "Taisiya", text: "Something that slumbers in these woods, especially as the Winter Solstice approaches.", color: "#306e00" },
        { name: "Andrey", text: "You mean... that thing on the television? The 'severe weather threat'?", color: "#000000" },
        { name: "Taisiya", text: "Weather. They try to give it a name that the city folk understand. But this is no mere storm, grandson. This is the breath of Karachun.", color: "#306e00" },
        { name: "Andrey", text: "Karachun? What is that? Some kind of animal?", color: "#000000" },
        { name: "Narrator", text: "Taisiya's voice drops, becoming almost a whisper", color: "#525252" },
        { name: "Taisiya", text: "Karachun is older than the oldest trees, colder than the deepest winter.", color: "#306e00" },
        { name: "Taisiya", text: "An ancient entity of the Winter Solstice itself. It feeds on fear, on despair, on the very life force of this land.", color: "#306e00" },
        //player choices
        { name: "Andrey", text: "Karachun? With all due respect, Taisiya, that sounds like something out of a fairy tale. I believe in bad weather and maybe some strange local legends, but an ancient spirit?", color: "#000000" },
        { name: "Andrey", text: "Karachun... it's an interesting story, I'll give you that. But do you really believe in it? Like, truly believe it's causing all this?", color: "#000000" },
        { name: "Andrey", text: "Karachun? Seriously? I came all this way worried sick about my brother, and you're telling me it's some old wives' tale?", color: "#000000" },
        //choice line
        { name: "Andrey", text: "Listen, Taisiya...", color: "#000000" },
        //answer lines
        { name: "Taisiya", text: "The city blinds you to the currents that flow beneath the surface, young man. Logic has its place, but there are forces in this world that defy your neat explanations.", color: "#306e00" },
        { name: "Taisiya", text: "I have seen the ice in summer, felt the breath of winter when the sun still held sway. I have seen the fear in the eyes of those Karachun has touched. My years are long, child, and they are filled with truths your books do not hold.", color: "#306e00" },
        { name: "Taisiya", text: "Fairy tales keep children from wandering into the dark woods. This is the darkness itself, stirring in our midst. Your brother's life hangs in the balance, and you scoff at the only hand offered to save him?", color: "#306e00" },
        // -------------- 
        { name: "Taisiya", text: "The wind howls not just from pressure, but from a deeper yearning. Look closer, feel the unnatural cold that settles even by the hearth. That is no mere winter chill.", color: "#306e00" },
        { name: "Andrey", text: "And my brother... is he in danger from this... Karachun?", color: "#000000" },
        { name: "Taisiya", text: "He is. As are all who linger in its shadow. The disappearances... the strange weather... the unease you felt in the village... these are its whispers, its growing power.", color: "#306e00" },
        { name: "Taisiya", text: "It can twist minds, lead astray, and those who are weak... it consumes.", color: "#306e00" },
        { name: "Andrey", text: "But the supervisor said it was just a delay...", color: "#000000" },
        { name: "Taisiya", text: "Lies and ignorance. They do not understand what they have awakened. But you... you felt it in your dream, didn't you? Your brother's fear? Karachun can reach across distances, especially to those bound by blood.", color: "#306e00" },
        //player choices
        { name: "Andrey", text: "Maybe everything is just a misunderstanding. The transport will probably arrive soon, and Dimka will be fine. We might be worrying over nothing", color: "#000000" },
        { name: "Andrey", text: "Maybe the supervisor was just stressed, Taisiya. Running a drilling rig in this kind of weather can't be easy. The transport delay could just be genuinely bad luck.", color: "#000000" },
        { name: "Andrey", text: "I mean, what reason would he have to lie? It's just a job, right? A bit of bad weather shouldn't turn into some supernatural conspiracy.", color: "#000000" },
        //choice line
        { name: "Andrey", text: "Listen, Taisiya...", color: "#000000" },
        //answer lines
        { name: "Taisiya", text: "Stress can make a man short-tempered, yes. But it does not make his eyes dart away when you speak of a missing soul.", color: "#306e00" },
        { name: "Taisiya", text: "Hope is a fragile thing in the face of ancient hunger. To wish away the darkness will not make it disappear.", color: "#306e00" },
        { name: "Taisiya", text: "Greed blinds men to many things, grandson. And some secrets are worth more than a paycheck.", color: "#306e00" },
        // -------------- 
        { name: "Taisiya", text: "That was not just a dream, child. That was a warning. Karachun's influence is growing stronger with each passing hour, as the Winter Solstice draws near. That is its time of greatest power.", color: "#306e00" },
        { name: "Andrey", text: "So, what can I do? How can I help him?", color: "#000000" },
        { name: "Taisiya", text: "There is a way. An ancient ritual, a banishment. It requires courage, a pure heart... and belief. It can push back the darkness, weaken Karachun's hold.", color: "#306e00" },
        { name: "Andrey", text: "A ritual? You want me to perform some kind of magic?", color: "#000000" },
        { name: "Taisiya", text: "It is not magic, grandson. It is a connection to the old ways, a drawing of power from the land itself. It has been done for generations to protect this place. ", color: "#306e00" },
        { name: "Andrey", text: "For my brother... I'll do anything. What do I need to do?", color: "#000000" },
        { name: "Taisiya", text: "The time is short. The Winter Solstice is but a few nights away. We must gather certain symbols, certain herbs.", color: "#306e00" },
        { name: "Inventory", text: "Item added to inventory: herbs", color: "#268000" },
        { name: "Taisiya", text: "And you... you must be the one to perform the ritual. Your bond with your brother... that will be your strength. ", color: "#306e00" },
    ];

    function showScene24() {
        console.log("Scene 24");
        playerReputation = herbalistReputation;
        reputationValue = scene24.querySelector('.reputation-value');
        updateReputationDisplay(reputationValue);
        nextButton = scene24.querySelector('.next-button');
        characterNameElement = scene24.querySelector('.character-name');
        characterContainer = scene24.querySelector('.character-container');
        character2Container = scene24.querySelector('.character2-container');
        dialogueElement = scene24.querySelector('.dialogue');

        choicesContainer = scene24.querySelector('.choices');
        choiceButton1 = scene24.querySelector('.choice-button1');
        choiceButton2 = scene24.querySelector('.choice-button2');
        choiceButton3 = scene24.querySelector('.choice-button3');

        currentDialogueIndex = 0;
        playBgm("bgm3");

        scene23.classList.remove('active');
        scene24.classList.add('active');
        choicesContainer.classList.remove('active');

        if (scene24) {
            novelContainer.addEventListener('click', (event) => {
                if (event.target.classList.contains('choice-button1') || event.target.classList.contains('choice-button2') || event.target.classList.contains('choice-button3')) {
                    let reputationChange = parseInt(event.target.dataset.reputationChange);
                    changeReputation(reputationChange, reputationValue);
                    choicesContainer.classList.remove('active');
                    nextButton.classList.add('next-button');
                    updateReputationDisplay(reputationValue);
                }
            });

            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene24Data.length) {
                        let currentDialogue = scene24Data[currentDialogueIndex];

                        //Choices 1
                        if (currentDialogueIndex == 11) {
                            choicesContainer.classList.add('active');
                            nextButton.classList.remove('next-button');

                            choiceButton1.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene24Data[currentDialogueIndex];
                            choiceButton2.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene24Data[currentDialogueIndex];
                            choiceButton3.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                        }
                        if (currentDialogueIndex == 15) {
                            if (playerReputation >= 50) {
                                currentDialogueIndex += 0;
                            } else if (playerReputation >= 40) {
                                currentDialogueIndex += 1;
                            } else {
                                currentDialogueIndex += 2;
                            }
                        } else if (currentDialogueIndex >= 15 && currentDialogueIndex <= 17) {
                            currentDialogueIndex = 18;
                        }

                        //Choices 2
                        if (currentDialogueIndex == 24) {
                            choicesContainer.classList.add('active');
                            nextButton.classList.remove('next-button');

                            choiceButton1.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene24Data[currentDialogueIndex];
                            choiceButton2.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                            currentDialogue = scene24Data[currentDialogueIndex];
                            choiceButton3.textContent = currentDialogue.text;
                            currentDialogueIndex++;
                        }
                        if (currentDialogueIndex == 28) {
                            if (playerReputation >= 50) {
                                currentDialogueIndex += 0;
                            } else if (playerReputation >= 30) {
                                currentDialogueIndex += 1;
                            } else {
                                currentDialogueIndex += 2;
                            }
                        } else if (currentDialogueIndex >= 28 && currentDialogueIndex <= 30) {
                            currentDialogueIndex = 31;
                        }

                        isTyping = true;
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene24Data[currentDialogueIndex].text, scene24Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Taisiya") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }

                        if (currentDialogue.name == "Inventory") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }

                    } else {
                        herbalistReputation = playerReputation;
                        console.log("herbalistReputation = " + herbalistReputation);
                        showScene25();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene24');
        }
    }


    //  ------------------- SCENE 25 ---------------------

    const scene25Data = [
        { name: "", text: "", color: "" },
        { name: "Narrator", text: "The air is thick with the pungent aroma of various dried herbs hanging from the rafters and scattered on the floor.", color: "#525252" },
        { name: "Narrator", text: "Taisiya, her movements surprisingly agile for her age, is meticulously arranging a circle of herbs on the wooden floor. ", color: "#525252" },
        { name: "Narrator", text: "Andrey watches her, a mixture of nervousness and determined resolve on his face. He holds a small, carved wooden amulet that Taisiya instructed him to carry, its surface surprisingly warm to the touch.", color: "#525252" },
        { name: "Taisiya", text: "The night deepens, grandson. The veil thins. Karachun's power grows with the approach of the Solstice. We must be swift and sure.", color: "#306e00" },
        { name: "Andrey", text: "I've gathered everything you asked for.", color: "#000000" },
        { name: "Taisiya", text: "Good. The connection between you is the strongest weapon we have against that ancient cold. Now, take this.", color: "#306e00" },
        { name: "Taisiya", text: "The words… do you remember them? The incantation of banishment?", color: "#306e00" },
        { name: "Andrey", text: "'Ancient frost, spirit of the endless night, your icy grip shall not hold sway in this place. By the warmth of life, by the bond of kin, by the strength of the earth, I command you to recede. Return to your shadows, your power broken here.'", color: "#000000" },
        { name: "Taisiya", text: "Good. Your voice must be strong, filled with conviction. Doubt is a crack in our defenses that Karachun will exploit.", color: "#306e00" },
        { name: "Taisiya", text: "The circle is cast. It is a boundary, a space between worlds. When the time is right, you will step within it. I will stand beside you, my strength woven with yours.", color: "#306e00" },
        { name: "Narrator", text: "The wind howls outside, rattling the windows of the small hut. The oil lamp flickers violently, casting dancing shadows on the walls.", color: "#525252" },
        { name: "Narrator", text: "Taisiya looks at Andrey, her eyes filled with an ancient wisdom and a fierce determination.", color: "#525252" },
        { name: "Taisiya", text: "The time is now. Step into the circle. Remember your brother. Remember your strength. We will face the Winter Solstice together.", color: "#306e00" },
        { name: "Taisiya", text: "The ritual begins.", color: "#306e00" },
    ];

    function showScene25() {
        console.log("Scene 25");
        nextButton = scene25.querySelector('.next-button');
        characterNameElement = scene25.querySelector('.character-name');
        characterContainer = scene25.querySelector('.character-container');
        character2Container = scene25.querySelector('.character2-container');
        dialogueElement = scene25.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm3");

        scene24.classList.remove('active');
        scene25.classList.add('active');

        if (scene25) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene25Data.length) {
                        isTyping = true;
                        const currentDialogue = scene25Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene25Data[currentDialogueIndex].text, scene25Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Taisiya") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }
                    } else {
                        showGame2();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene 25');
        }
    }

    // -------------------- MINI GAME 2 ------------------------

    function showGame2() {
        scene25.classList.remove('active');
        game2.classList.add('active');
        console.log("Game 2");
        playBgm("bgm8");
        startGame2();
    }

    const imageDisplay = document.getElementById('current-image');
    const wordInput = document.getElementById('word-input');
    const timerDisplay2 = document.getElementById('time2');
    const correctDisplay = document.getElementById('correct');
    const messageDisplay = document.querySelector('.message');

    const wordsData = [
        { word: "bklsti", image: "images/runes1.png" },
        { word: "hnupom", image: "images/runes2.png" },
        { word: "iarchl", image: "images/runes3.png" },
        { word: "tgbeyc", image: "images/runes4.png" },
        { word: "fkjloh", image: "images/runes5.png" },
    ];
    let currentWordIndex = 0;
    let correctWords = 0;
    let timeLeft2 = 0;
    let gameInterval2;

    function startGame2() {
        currentWordIndex = 0;
        correctWords = 0;
        timeLeft2 = 5 + herbalistReputation;
        correctDisplay.textContent = `0 / 5`;
        messageDisplay.textContent = '';
        wordInput.value = '';
        wordInput.focus();
        displayImage2();
        clearInterval(gameInterval2);
        gameInterval2 = setInterval(updateTimer2, 1000);
    }

    function displayImage2() {
        if (currentWordIndex < wordsData.length) {
            imageDisplay.src = wordsData[currentWordIndex].image;
            imageDisplay.alt = wordsData[currentWordIndex].word;
        } else {
            endGame2();
        }
    }

    wordInput.addEventListener('input', () => {
        let word = wordInput.value.trim();
        if (word.toLowerCase() === wordsData[currentWordIndex].word) {
            correctWords++;
            correctDisplay.textContent = `${correctWords} / 5`;
            wordInput.value = '';
            currentWordIndex++;
            if (correctWords >= 5) {
                endGame2(true);
            } else if (currentWordIndex < wordsData.length) {
                displayImage2();
            } else {
                endGame2();
            }
        }
    });

    function updateTimer2() {
        timeLeft2--;
        timerDisplay2.textContent = timeLeft2;
        if (timeLeft2 <= 0) {
            endGame2(false);
        }
    }

    function endGame2(win = false) {
        clearInterval(gameInterval2);
        wordInput.disabled = true;
        if (win) {
            console.log("Game2 win");
            showScene28();
        } else {
            console.log("Game2 lost");
            showScene26();
        }
    }

    //  ------------------- SCENE 26 ---------------------

    const scene26Data = [
        { name: "", text: "", color: "" },
        { name: "Taisiya", text: "Do not waver, grandson! The darkness tests your resolve!", color: "#306e00" },
        { name: "Narrator", text: "Andrey tries to continue the incantation, but a new sound joins the howling wind – a low, guttural growl that seems to emanate from the very air around them. The shadows in the room deepen, coalescing into vague, menacing shapes.", color: "#525252" },
        { name: "Taisiya", text: "It's too strong... the ritual... it's breaking...", color: "#306e00" },
        { name: "Narrator", text: "The growling intensifies, and the shadows swirl around Andrey, pressing in on him. He feels a presence, ancient and malevolent, entering the hut, filling the space with an unbearable cold and a suffocating dread.", color: "#525252" },
        { name: "Narrator", text: "He tries to move, to flee the encroaching darkness, but his limbs feel heavy, unresponsive. A voice, cold as the winter wind and sharp as ice shards, whispers in his mind, not through his ears.", color: "#525252" },
        { name: "Voice from the darkness", text: "You sought to banish the ancient one? You dare to defy the Winter's Night?", color: "#c20003" },
        { name: "Andrey", text: "(His voice strained, not his own) Get away... leave me...", color: "#000000" },
        { name: "Narrator", text: "His eyes widen, no longer reflecting his own fear, but a cold, malevolent light.", color: "#525252" },
        { name: "Narrator", text: "A cruel smile stretches his lips, a smile that Dimka would never recognize.", color: "#525252" },
        { name: "Taisiya", text: "Karachun...", color: "#306e00" },
        { name: "Narrator", text: "The transformation is swift and terrifying. Andrey’s posture changes, becoming rigid and unnatural.", color: "#525252" },
        { name: "Narrator", text: "His breathing becomes shallow and raspy. The air around him seems to crackle with an unnatural energy.", color: "#525252" },
        { name: "Narrator", text: "He turns slowly towards Taisiya, his eyes now glowing with the same icy light he saw in his nightmare.", color: "#525252" },
        { name: "Narrator", text: "The last vestiges of Andrey’s humanity flicker and die, replaced by the cold, ancient will of Karachun.", color: "#525252" },
        { name: "''Andrey''", text: "The Winter Night has claimed another. Your little fire could not hold back the frost, old woman. Now... the hunt begins anew.", color: "#c20003" },
        { name: "Narrator", text: "Taisiya can only stare in horror as the creature that was once Andrey takes a step towards her, the icy light in its eyes promising a cold and inevitable end.", color: "#525252" },
    ];

    function showScene26() {
        console.log("Scene 26");
        nextButton = scene26.querySelector('.next-button');
        characterNameElement = scene26.querySelector('.character-name');
        characterContainer = scene26.querySelector('.character-container');
        character2Container = scene26.querySelector('.character2-container');
        dialogueElement = scene26.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm2");

        game2.classList.remove('active');
        scene26.classList.add('active');

        if (scene26) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene26Data.length) {
                        isTyping = true;
                        const currentDialogue = scene26Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene26Data[currentDialogueIndex].text, scene26Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Taisiya") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }

                        if (currentDialogue.name == "Voice from the darkness") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }
                    } else {
                        playBgm("bgm5");
                        showSceneEndBad();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene 26');
        }
    }

    //  ------------------- SCENE 28 ---------------------

    const scene28Data = [
        { name: "", text: "", color: "" },
        { name: "Narrator", text: "The air crackles with energy, but it's no longer a cold dread; instead, it feels like a cleansing warmth.", color: "#525252" },
        { name: "Andrey", text: "...return to your shadows, your power broken here!", color: "#000000" },
        { name: "Narrator", text: "A collective groan, like the cracking of ancient ice, echoes faintly from the forest.", color: "#525252" },
        { name: "Narrator", text: "The howling wind outside begins to subside, gradually softening to a gentle whisper. ", color: "#525252" },
        { name: "Narrator", text: "The oppressive cold that had permeated the hut begins to dissipate, replaced by a normal, winter chill.", color: "#525252" },
        { name: "Narrator", text: "Taisiya stops chanting, her breath coming in ragged gasps, but a look of profound relief washes over her aged face.", color: "#525252" },
        { name: "Taisiya", text: "It is done. The ancient one is bound once more.", color: "#306e00" },
        { name: "Andrey", text: " Did it... did it really work?", color: "#000000" },
        { name: "Taisiya", text: "The old ways still hold power, grandson, when wielded with a true heart and a clear purpose.", color: "#306e00" },
        { name: "Taisiya", text: "The connection between you and your brother... it was a strong anchor against the darkness.", color: "#306e00" },
        { name: "Narrator", text: "She gestures towards the window, where the storm clouds seem to be breaking apart, revealing a sliver of moon.", color: "#525252" },
        { name: "Taisiya", text: "The wind has calmed. The land breathes easier. Karachun's influence has been pushed back. For now.", color: "#306e00" },
        { name: "Andrey", text: "So... Dimka is safe now?", color: "#000000" },
        { name: "Taisiya", text: "The immediate threat has passed. But the stirring of such an ancient evil leaves a residue. ", color: "#306e00" },
        { name: "Taisiya", text: "The drilling site... it remains a place touched by darkness. Your brother should leave that place, Andrey. It is no longer safe for him there.", color: "#306e00" },
        { name: "Andrey", text: "I'll convince him. After all this... I don't think he'll argue.", color: "#000000" },
        { name: "Narrator", text: "He looks at Taisiya, a deep gratitude in his eyes.", color: "#525252" },
        { name: "Andrey", text: "Thank you. I... I don't know how to thank you.", color: "#000000" },
        { name: "Taisiya", text: "You faced the darkness, grandson. That is thanks enough. Now, rest. The night is still young, and the journey home awaits.", color: "#306e00" },
        { name: "Taisiya", text: "But the air is cleaner now. The Winter Night holds its breath. For a time.", color: "#306e00" },
    ];

    function showScene28() {
        console.log("Scene 28");
        nextButton = scene28.querySelector('.next-button');
        characterNameElement = scene28.querySelector('.character-name');
        characterContainer = scene28.querySelector('.character-container');
        character2Container = scene28.querySelector('.character2-container');
        dialogueElement = scene28.querySelector('.dialogue');

        currentDialogueIndex = 0;
        playBgm("bgm9");

        game2.classList.remove('active');
        scene28.classList.add('active');

        if (scene28) {
            nextButton.addEventListener('click', () => {
                if (isTyping == false) {
                    currentDialogueIndex++;
                    console.log("currentDialogueIndex = " + currentDialogueIndex);
                    if (currentDialogueIndex < scene28Data.length) {
                        isTyping = true;
                        const currentDialogue = scene28Data[currentDialogueIndex];
                        characterNameElement.textContent = currentDialogue.name;
                        characterNameElement.style.color = currentDialogue.color;
                        typeText(dialogueElement, scene28Data[currentDialogueIndex].text, scene28Data[currentDialogueIndex].color, 30, () => {
                            isTyping = false;
                        });

                        if (currentDialogue.name == "Taisiya") {
                            characterContainer.classList.add('active');
                            characterContainer.classList.remove('inactive');
                        } else {
                            characterContainer.classList.add('inactive');
                            characterContainer.classList.remove('active');
                        }

                        if (currentDialogue.name == "Voice from the darkness") {
                            character2Container.classList.add('active');
                            character2Container.classList.remove('inactive');
                        } else {
                            character2Container.classList.add('inactive');
                            character2Container.classList.remove('active');
                        }
                    } else {
                        showSceneEndGood();
                    }
                }
            });
        } else {
            console.error('not all elements exist scene 28');
        }
    }

    //  ------------------- SCENE END 3 ---------------------
    function showSceneEndGood() {
        scene28.classList.remove('active');
        gameOverGood.classList.add('active');
        restartButton = gameOverGood.querySelector('.restart-button');
        restartButton.addEventListener('click', () => {
            window.location.reload();
        });
    }

    //  ------------------- SCENE END 2 ---------------------
    function showSceneEndBad() {
        scene26.classList.remove('active');
        gameOverBad.classList.add('active');
        restartButton = gameOverBad.querySelector('.restart-button');
        restartButton.addEventListener('click', () => {
            window.location.reload();
        });
    }

    //  ------------------- SCENE END 1 ---------------------
    function showSceneEndNeutral() {
        scene21.classList.remove('active');
        gameOverNeutral.classList.add('active');
        restartButton = gameOverNeutral.querySelector('.restart-button');
        restartButton.addEventListener('click', () => {
            window.location.reload();
        });
    }

    //  ------------------- SCENE END 0 --------------------- Death
    function showSceneEnd() {
        scene11.classList.remove('active');
        scene18.classList.remove('active');
        gameOverMenu.classList.add('active');
        restartButton = gameOverMenu.querySelector('.restart-button');
        restartButton.addEventListener('click', () => {
            window.location.reload();
        });
    }

    //  ------------------- SCENE 29 EMPTY ---------------------
    function showSceneEmpty() {
        scene29.classList.add('active');
        restartButton = gameOverMenu.querySelector('.restart-button');
        restartButton.addEventListener('click', () => {
            window.location.reload();
        });
    }

    // ======================= DEBUG =========================

    goToSceneButton.addEventListener('click', () => {
        const selectedSceneId = sceneSelector.value;
        if (selectedSceneId) {
            showScene(selectedSceneId);
        }
    });

    function showScene(sceneIdToShow) {
        scene1.classList.remove('active');
        scene2.classList.remove('active');
        scene3.classList.remove('active');
        scene4.classList.remove('active');
        scene5.classList.remove('active');
        scene6.classList.remove('active');
        scene7.classList.remove('active');
        scene8.classList.remove('active');
        scene9.classList.remove('active');
        scene10.classList.remove('active');
        scene11.classList.remove('active');
        scene12.classList.remove('active');
        scene13.classList.remove('active');
        scene14.classList.remove('active');
        scene15.classList.remove('active');
        scene16.classList.remove('active');
        scene17.classList.remove('active');
        scene18.classList.remove('active');
        scene19.classList.remove('active');
        scene20.classList.remove('active');
        scene21.classList.remove('active');
        scene22.classList.remove('active');
        scene23.classList.remove('active');
        scene24.classList.remove('active');
        scene25.classList.remove('active');
        scene26.classList.remove('active');
        //scene27.classList.remove('active');
        scene28.classList.remove('active');
        scene29.classList.remove('active');
        mainMenu.classList.remove('active');
        gameOverMenu.classList.remove('active');
        gameOverGood.classList.remove('active');
        gameOverNeutral.classList.remove('active');
        gameOverBad.classList.remove('active');
        videoScene.classList.remove('active');
        game1.classList.remove('active');
        game2.classList.remove('active');

        console.log(sceneIdToShow);
        if (sceneIdToShow == 2) {
            showScene2();
        }
        if (sceneIdToShow == 3) {
            showScene3();
        }
        if (sceneIdToShow == 4) {
            showScene4();
        }
        if (sceneIdToShow == 5) {
            showScene5();
        }
        if (sceneIdToShow == 6) {
            showScene6();
        }
        if (sceneIdToShow == 7) {
            showScene7();
        }
        if (sceneIdToShow == 8) {
            showScene8();
        }
        if (sceneIdToShow == 9) {
            showScene9();
        }
        if (sceneIdToShow == 10) {
            showScene10();
        }
        if (sceneIdToShow == 11) {
            showScene11();
        }
        if (sceneIdToShow == 12) {
            showScene12();
        }
        if (sceneIdToShow == 13) {
            showScene13();
        }
        if (sceneIdToShow == 14) {
            showScene14();
        }
        if (sceneIdToShow == 15) {
            showScene15();
        }
        if (sceneIdToShow == 16) {
            showScene16();
        }
        if (sceneIdToShow == 17) {
            showScene17();
        }
        if (sceneIdToShow == 18) {
            showScene18();
        }
        if (sceneIdToShow == 19) {
            showScene19();
        }
        if (sceneIdToShow == 20) {
            showScene20();
        }
        if (sceneIdToShow == 21) {
            showScene21();
        }
        if (sceneIdToShow == 22) {
            showScene22();
        }
        if (sceneIdToShow == 23) {
            showScene23();
        }
        if (sceneIdToShow == 24) {
            showScene24();
        }
        if (sceneIdToShow == 25) {
            showScene25();
        }
        if (sceneIdToShow == 26) {
            showScene26();
        }
        if (sceneIdToShow == 27) {
            showScene27();
        }
        if (sceneIdToShow == 28) {
            showScene28();
        }
        if (sceneIdToShow == 29) {
            showSceneEmpty();
        }

        if (sceneIdToShow == "game1") {
            showGame1();
        }
        if (sceneIdToShow == "game2") {
            showGame2();
        }
        if (sceneIdToShow == "vid") {
            showVideo();
        }
    }
});