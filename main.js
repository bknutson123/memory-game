window.onload = function() {
    
    document.querySelector('body').style.opacity = 0;

	setTimeout(() => {
		document.querySelector('body').style.opacity = 1;
	});
    
    const body = document.querySelector('body'),
        numSquares = document.querySelector('#settings p span'),
        input = document.querySelector('#settings input'),
        startButton = document.querySelector('#settings button[name=start]'),
        resetButton = document.querySelector('#settings button[name=reset]'),
        gameBoard = document.querySelector('#play-area');
        
    input.addEventListener('input', () => {
       numSquares.innerHTML = input.value; 
    });
    resetButton.addEventListener('click', () => {
       startButton.removeAttribute('disabled', '');
       input.removeAttribute('disabled', '')
       gameBoard.innerHTML = '';
    });
    startButton.addEventListener('click', () => {
       startButton.setAttribute('disabled', '');
       input.setAttribute('disabled', '');
       
       for (let i = 0; i < input.value; i++){
            gameBoard.innerHTML += '<label><input type="checkbox"  /><div class="card"><div class="front"></div><div class="back"></div></div></label>'
       }
       
       
       
      let numbers = [];
      for (let i = 0; i < input.value / 2; i++) {
          numbers.push(i,i);
      }
      while (numbers.length != 0) {
        var randomNumber = Math.floor(Math.random() * input.value);
        var randomBox = document.querySelectorAll('.back')[randomNumber];
        if (!randomBox.innerHTML) {
					randomBox.innerHTML = numbers.shift();
		}
      }
        startGame();
    });
    
    function startGame() {
        let squares = document.querySelectorAll('.card');
        let firstSquareClicked;
        let secondSquareClicked;
        
        for (let i = 0; i < squares.length; i++) {
            squares[i].addEventListener('click', match);
            squares[i].value = document.querySelector('#play-area').childNodes[i].childNodes[1].childNodes[1].innerHTML
        }
        
        function match(square) {
             //first square click
                if (!firstSquareClicked) {
                    firstSquareClicked = square.target.parentNode;
                    firstSquareClicked.classList.toggle('flipped');
                }
                //second square click
                else if (square.target.parentNode !== firstSquareClicked) {
                    secondSquareClicked = square.target.parentNode;
                    secondSquareClicked.classList.toggle('flipped');
                  
                    console.log("first child inner text: " + firstSquareClicked.value);
                    console.log("second child inner text: " + secondSquareClicked.value);
                    if (firstSquareClicked.value === secondSquareClicked.value) {

                        firstSquareClicked.classList.add("matched");
                        secondSquareClicked.classList.add("matched");
                        
                        firstSquareClicked.removeEventListener('click', match);
    					secondSquareClicked.removeEventListener('click', match);


    					tilesClickDelayAndWinCheck();

                    }
                    else {
                        setTimeout(() => {
						firstSquareClicked.classList.toggle('flipped');
						secondSquareClicked.classList.toggle('flipped');
					    }, 400);

				        tilesClickDelayAndWinCheck();
                    }
                    	setTimeout(() => {
					firstSquareClicked = undefined;
				        }, 400);
                }
                
        }
        	// Removes click events on tiles to be able to see the second tile, then adds events back.
		function tilesClickDelayAndWinCheck() {
			let notMatchedTiles = 0;

			for (let i = 0; i < squares.length; i++) {
				squares[i].removeEventListener('click', match);

				if (!squares[i].classList.contains('matched')) {
					notMatchedTiles++;
				}
			}
            console.log(notMatchedTiles);
			if (notMatchedTiles === 0) {
				console.log('You won!');
				winMenu();
				return;
			}

			setTimeout(() => {
				for (let i = 0; i < squares.length; i++) {
					squares[i].addEventListener('click', match);
				}
			}, 400);
		}

		function winMenu() {
			body.innerHTML += '<div id="winScreen"></div>';
			document.querySelector('#winScreen').innerHTML = '<p>You won!</p>';

			setTimeout(() => {
				document.querySelector('#winScreen').style.background = 'rgba(0, 0, 0, .7)';
			}, 100);
			
			setTimeout(() => {
				body.removeChild(document.querySelector('#winScreen'));
			}, 2000);
		}

        
        	
    }
     
}