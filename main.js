let config = {

	containerColorBG: "#353336",
	contentColorBG: "#525053",

	countRows: 3,
	countCols: 5,

	offsetBorder: 10,
	borderRadius: 8,
		
	gemSize: 60,

	imagesCoin: ["images/coin/coin_1.png", "images/coin/coin_2.png", "images/coin/coin_3.png", "images/coin/coin_4.png", "images/coin/coin_5.png", "images/coin/coin_6.png", "images/coin/coin_7.png", "images/coin/coin_8.png"],
	imagesCoin2: [document.createElement( "div" ),],

	gemClass:"gem",
	gemIdPrefix: "gem",
	gameStates: ["pick", "switch", "revert", "remove", "refill"],
	gameState: "",
	
	movingItems: 0,

	countScore: 0
}

let player = {
	selectedRow: -1,
	selectedCol: -1,
	posX: "",
	posY: ""
}

let components = {
	container: document.createElement( "div" ),
	content: document.createElement( "div" ),
	wrapper: document.createElement( "div" ),
	cursor: document.createElement( "div" ),
	score: document.createElement( "div" ),
	gems: new Array(),
}






// start Game
initGame();

// Инициализация всех составляющих игры
function initGame () {
	document.body.style.margin = "0px";
	createPage();
	createContentPage();
	createWrapper();
	createCursor();
	createGrid();
	createScore();

	// Переключаем статус игры на "выбор"
	config.gameState = config.gameStates[ 0 ];
}


// Создание обертки для страницы
function createPage() {
	components.container.style.backgroundColor = config.containerColorBG;
	components.container.style.height = "100vh";
	components.container.style.overflow = "hidden";
	components.container.style.display = "flex";
	components.container.style.alignItems = "center";
	components.container.style.justifyContent = "center";

	document.body.append( components.container );
}

// Создание обертки с контентом
function createContentPage () {
	components.content.style.padding = config.offsetBorder + "px";
	components.content.style.width = 	(config.gemSize * config.countCols) + 
										(config.offsetBorder * 2) + "px";
	components.content.style.height = 	(config.gemSize * config.countRows) +
										(config.offsetBorder * 2) + "px";
	components.content.style.backgroundColor = config.contentColorBG;
	components.content.style.boxShadow = config.offsetBorder + "px";
	components.content.style.borderRadius = config.borderRadius + "px";
	components.content.style.boxSizing = "border-box";

	components.container.append( components.content );
}

// Создание обертки для монет и очков
function createWrapper () {
	components.wrapper.style.position = "relative";
	components.wrapper.style.height = "100%";
	components.wrapper.addEventListener("click", function(event) { handlerTab(event, event.target) });
	components.wrapper.className = "wrapper-bg";
	components.wrapper.id = "wrapper-b";

	components.content.append( components.wrapper );
}

// Создание курсора для выделения монет
function createCursor () {
	components.cursor.className = "cursor-border";
	components.cursor.id = "marker";
	components.cursor.style.width = config.gemSize - 10 + "px";
	components.cursor.style.height = config.gemSize - 10 + "px";
	//components.cursor.style.border = "5px solid white";
	//components.cursor.style.backgroundColor = "white";
	
	//components.cursor.style.borderRadius = "20px";
	components.cursor.style.position = "absolute";
	components.cursor.style.display = "none";

	components.wrapper.append( components.cursor );
}
// Показать курсор
function cursorShow () {
	components.cursor.style.display = "block";
}
// Скрыть курсор
function cursorHide () {
	components.cursor.style.display = "none";
}

// Создание блока для очков
function createScore () {
	components.score.style.width = 200 + "px";
	components.score.style.height = 50 + "px";
	components.score.style.display = "flex";
	components.score.style.justifyContent = "center";
	components.score.style.alignItems = "center";
	components.score.style.borderRadius = config.borderRadius + "px";
	components.score.style.backgroundColor = config.contentColorBG;
	components.score.style.position = "absolute";
	components.score.style.bottom = "calc(100% + " + 24 + "px)";
	components.score.style.left = "calc(50% - " + ( parseInt(components.score.style.width) / 2) + "px)";

	components.score.style.fontFamily = "sans-serif";
	components.score.style.fontSize = "16px";
	components.score.style.color = "#ffffff";
	

	updateScore();
}

// Обновить очки на странице
function updateScore () {
	components.score.innerHTML = config.countScore;
	components.wrapper.append( components.score );
}

// Добавление очков
function scoreInc ( count ) {
	if ( count >= 4 ) {
		count *= 2;
	} else if ( count >= 5 ) {
		count = ( count + 1 ) * 2;
	} else if ( count >= 6 ) {
		count *= ( count + 2 ) * 2;
	}

	config.countScore += count;
	updateScore();
}

// Создание монеты
function createGem ( t, l, row, col, img ) {
	let coin = document.createElement("div");

	coin.classList.add( config.gemClass );
	coin.id = config.gemIdPrefix + '_' + row + '_' + col;
	coin.style.boxSizing = "border-box";
	coin.style.cursor = "pointer";
	coin.style.position = "absolute";
	coin.style.top = t + "px";
	coin.style.left = l + "px";
	coin.style.width = config.gemSize + "px";
	coin.style.height = config.gemSize + "px";
	coin.style.border = "1p solid transparent";
	coin.style.backgroundImage = "url("+ img +")";
	coin.style.backgroundSize = "100%";

	components.wrapper.append( coin );
}


function createGem2 ( t, l, row, col, img ) {
	let coin = document.createElement("div");
	if(img === 'images/coin/coin_1.png'){
		let box = document.createElement('div'),
		p = document.createElement('div'), 
		p1 = document.createElement('div'),
		p2 = document.createElement('div'), 
		p3 = document.createElement('div');
		p.className = "box box-front";
		p1.className = "box box-back";
		p2.className = "box box-right";
		p3.className = "box box-left";
	
		box.appendChild(p);
		box.appendChild(p1);
		box.appendChild(p2);
		box.appendChild(p3);
		coin.appendChild(box);
		box.className = "box-area";
		coin.className = "wrapper";
	} 
	if(img === 'images/coin/coin_2.png'){
		let box = document.createElement('div');
		coin.appendChild(box);
		box.className = "ball";
		
	} else if (img === 'images/coin/coin_3.png') {
		let box = document.createElement('div'),
		p = document.createElement('div'), 
		p1 = document.createElement('div'),
		p2 = document.createElement('div'), 
		p3 = document.createElement('div');
		// p4 = document.createElement('div'), 
		// p5 = document.createElement('div'),
		// p6 = document.createElement('div'), 
		// p7 = document.createElement('div');

		p.className = "box-2 box-front-2";
		p1.className = "box-2 box-back-2";
		p2.className = "box-2 box-right-2";
		p3.className = "box-2 box-left-2";

		// p4.className = "box-3 box-front-bottom";
		// p5.className = "box-3 box-back-bottom";
		// p6.className = "box-3 box-right-bottom";
		// p7.className = "box-3 box-left-bottom";
	
		box.appendChild(p);
		box.appendChild(p1);
		box.appendChild(p2);
		box.appendChild(p3);
		// box.appendChild(p4);
		// box.appendChild(p5);
		// box.appendChild(p6);
		// box.appendChild(p7);
		coin.appendChild(box);
		box.className = "box-area-2";
		coin.className = "wrapper-2";
	}



 else if (img === 'images/coin/coin_4.png') {

	let box = document.createElement('div');
		coin.appendChild(box);
		box.className = "ball-green";
	// let box = document.createElement('div'),
	// p = document.createElement('div'), 
	// p1 = document.createElement('div'),
	// p2 = document.createElement('div'), 
	// p3 = document.createElement('div');
	// p4 = document.createElement('div'), 
	// p5 = document.createElement('div'),
	// p6 = document.createElement('div'), 
	// p7 = document.createElement('div');

	// p.className = "box-3 box-front-3";
	// p1.className = "box-3 box-back-3";
	// p2.className = "box-3 box-right-3";
	// p3.className = "box-3 box-left-3";

	// p4.className = "box-4 box-front-bottom";
	// p5.className = "box-4 box-back-bottom";
	// p6.className = "box-4 box-right-bottom";
	// p7.className = "box-4 box-left-bottom";

	// box.appendChild(p);
	// box.appendChild(p1);
	// box.appendChild(p2);
	// box.appendChild(p3);
	// box.appendChild(p4);
	// box.appendChild(p5);
	// box.appendChild(p6);
	// box.appendChild(p7);
	// coin.appendChild(box);
	// box.className = "box-area-3";
	// coin.className = "wrapper-2";



 }else if (img === 'images/coin/coin_5.png') {
		let box = document.createElement('div');
		coin.appendChild(box);
		box.className = "ball-yellow";
		
	}

	else if (img === 'images/coin/coin_6.png') {
		let box = document.createElement('div');
		coin.appendChild(box);
		box.className = "ball-pink";
		
	}

	else if (img === 'images/coin/coin_7.png') {
		let box = document.createElement('div');
		coin.appendChild(box);
		box.className = "ball-orange";
		
	}
	else if (img === 'images/coin/coin_8.png') {
		let box = document.createElement('div');
		coin.appendChild(box);
		box.className = "ball-purple";
		
	}
	
	


	
	coin.classList.add( config.gemClass );
	coin.id = config.gemIdPrefix + '_' + row + '_' + col;
	coin.style.boxSizing = "border-box";
	coin.style.cursor = "pointer";
	coin.style.position = "absolute";
	coin.style.top = t + "px";
	coin.style.left = l + "px";
	coin.style.width = config.gemSize + "px";
	coin.style.height = config.gemSize + "px";
	
	coin.style.backgroundSize = "100%";

	components.wrapper.append( coin );
}

// Создание и наполнение сетки для монет
function createGrid() {
	// Создание пустой сетки
	let x = 0;
	for(i = 0; i < config.countRows; i++) {
		components.gems[i] = new Array();
		for(j = 0; j < config.countCols; j++) {
			components.gems[i][j] = -1;
		}
	}

	// Заполняем сетку
	
	// if(arrayOfData === undefined){
		for( i = 0; i < config.countRows; i++ ) {
			for( j = 0; j < config.countCols; j++ ) {

				do{
					components.gems[i][j] = Math.floor(Math.random() * 8);
				} while( isStreak(i, j) );

				createGem2( i * config.gemSize, j * config.gemSize, i, j, config.imagesCoin[ components.gems[i][j] ] );
			}
		}
	// }else{
	// 	for( i = 0; i < config.countRows; i++ ) {
	// 		for( j = 0; j < config.countCols; j++ ) {

	// 	do{
	// 		components.gems[i][j] = arrayOfData[x];
	// 		x++;
	// 	} while( isStreak(i, j) );

	// 		createGem2( i * config.gemSize, j * config.gemSize, i, j, config.imagesCoin[ components.gems[i][j] ] );
	// 		}
	// 	}
	// }
}

// Проверка на группу сбора
function isStreak( row, col ) {
	return isVerticalStreak( row, col ) || isHorizontalStreak( row, col );
}
// Проверка на группу сбора по колонкам
function isVerticalStreak( row, col ) {
	let gemValue = components.gems[row][col];
	let streak = 0;
	let tmp = row;

	while(tmp > 0 && components.gems[tmp - 1][col] == gemValue){
		streak++;
		tmp--;
	}

	tmp = row;

	while(tmp < config.countRows - 1 && components.gems[tmp + 1][col] == gemValue){
		streak++;
		tmp++;
	}

	return streak > 1;
}
// Проверка на группу сбора по строкам
function isHorizontalStreak( row, col ) {
	let gemValue = components.gems[row][col];
	let streak = 0;
	let tmp = col;

	while(tmp > 0 && components.gems[row][tmp - 1] == gemValue){
		streak++;
		tmp--;
	}

	tmp = col;

	while(tmp < config.countCols - 1 && components.gems[row][tmp + 1] == gemValue){
		streak++;
		tmp++;
	}

	return streak > 1;
}



function createGrid2(arrayOfData) {
	// Создание пустой сетки
	let x = 0;
	for(i = 0; i < config.countRows; i++) {
		components.gems[i] = new Array();
		for(j = 0; j < config.countCols; j++) {
			components.gems[i][j] = -1;
		}
	}

	// Заполняем сетку
	
	
	for( i = 0; i < config.countRows; i++ ) {
		for( j = 0; j < config.countCols; j++ ) {

			
				components.gems[i][j] = arrayOfData[x];
				x++;
			// 	do{
			// } while( isStreak(i, j) );
				

				createGem2( i * config.gemSize, j * config.gemSize, i, j, config.imagesCoin[ components.gems[i][j] ] );
				}
	}
	
}



const chekingIsStreak = () => {
	let result;
	for(let s = 0; s < config.countRows; ++s) {
		for(let i = 0; i < config.countCols; ++i){
			console.log(s,i, 'tatat')
			if(isStreak(s, i)){
				result = true;
				break;
			}else{
				result = false;
			}
		}
	}
	console.log(result);
	return result;	
}
// Available moves
const isPosibleTurn = (array) => {
	let x = 0,
		cols = config.countCols,
		rows = config.countRows,
		result = [];

		for(let i = 0; i < cols; ++i){	
			if(x === 1) {break};
			for(let s = 0; s < rows; ++s) {
				// 5 pieces row middle left
				if(s+4 < config.countRows && array[s][i] === array[s+1][i] && array[s][i] === array[s+3][i] && array[s][i] === array[s+4][i] && array[s][i] === array[s+2][i-1]){
					result.push([s,i], [s+1,i], [s+2, i-1], [s+3,i], [s+4,i])
					x = 1;
					break;
				}
				// 5 pieces row middle right
				else if(s+4 < config.countRows && array[s][i] === array[s+1][i] && array[s][i] === array[s+3][i] && array[s][i] === array[s+4][i] && array[s][i] === array[s+2][i+1]){
					result.push([s,i], [s+1,i], [s+2, i+1], [s+3,i], [s+4,i])
					x = 1;
					break;
				}
				// 4 pieces row 3rd right
				else if(s+3 < config.countRows && array[s][i] === array[s+1][i] && array[s][i] === array[s+3][i] && array[s][i] === array[s+2][i+1]){
					result.push([s,i], [s+1,i], [s+3,i], [s+2, i+1])
					x = 1;
					break;
				}
				// 4 pieces row 2rd right
				else if(s+3 < config.countRows && array[s][i] === array[s+2][i] && array[s][i] === array[s+3][i] && array[s][i] === array[s+1][i+1]){
					result.push([s,i], [s+2,i], [s+3,i], [s+1, i+1])
					x = 1;
					break;
				}
				// 4 pieces row 3rd left
				else if(s+3 < config.countRows && array[s][i] === array[s+1][i] && array[s][i] === array[s+3][i] && array[s][i] === array[s+2][i-1]){
					result.push([s,i], [s+1,i], [s+3,i], [s+2, i-1])
					x = 1;
					break;
				}
				// 4 pieces row 2rd left
				else if(s+3 < config.countRows && array[s][i] === array[s+2][i] && array[s][i] === array[s+3][i] && array[s][i] === array[s+1][i-1]){
					result.push([s,i], [s+2,i], [s+3,i], [s+1, i-1])
					x = 1;
					break;
				}
				// 0,2,3
				else if(s+3 < config.countRows && array[s][i] === array[s+2][i] &&  array[s][i] === array[s+3][i]) {
					result.push([s,i], [s+2,i],[s+3,i])
					x = 1;
					break;
				// 0,1,3
				}else if ( s+3 < config.countRows && array[s][i] === array[s+1][i] &&  array[s][i] === array[s+3][i]) {
					result.push([s,i], [s+1,i], [s+3,i])
					x = 1;
					break;
				// straight and right
				} else if(s+2 < config.countRows && array[s][i] === array[s+1][i] &&  array[s+1][i] === array[s+1+1][i+1]) {
					result.push([s,i], [s+1, i], [s+1+1, i+1] )
					x = 1;
					break;
				}
				//straight and left	
				else if(s+2 < config.countRows && array[s][i] === array[s+1][i] &&  array[s+1][i] === array[s+1+1][i-1]) {
					result.push([s,i], [s+1, i], [s+1+1, i-1] )
					x = 1;
					break;
				}
				//straight and back-left
				else if(s+1 < config.countRows && s-1 >= 0 && array[s][i] === array[s+1][i] &&  array[s+1][i] === array[s-1][i-1]) {
					result.push([s,i], [s+1, i], [s-1, i-1] )
					x = 1;
					break;
				}
				//straight and back-right
				else if(s+1 < config.countRows && s-1 >= 0 && array[s][i] === array[s+1][i] &&  array[s+1][i] === array[s-1][i+1]) {
					result.push([s,i], [s+1, i], [s-1, i+1] )
					x = 1;
					break;
				}
				// two separated one right
				else if(s+2 < config.countRows && array[s][i] === array[s+2][i] &&  array[s][i] === array[s+1][i+1]) {
					result.push([s,i], [s+2, i], [s+1, i+1] )
					x = 1;
					break;
				}
				// two separated one left
				else if(s+2 < config.countRows && array[s][i] === array[s+2][i] &&  array[s][i] === array[s+1][i-1]) {
					result.push([s,i], [s+2, i], [s+1, i-1] )
					x = 1;
					break;
				}
				
				
			};
		
		}
		// horizontal
		for(let s = 0; s < rows; ++s){
			if(x === 1) {break};
			for(let i = 0; i !== cols; ++i) {
				// // 5 pieces row middle bottom
				if(s > 0 && array[s][i] === array[s][i+1] && array[s][i] === array[s][i+3] && array[s][i] === array[s][i+4] && array[s][i] === array[s-1][i+2]){
					result.push([s,i], [s,i+1], [s-1, i+2], [s,i+3], [s,i+4]);
					x = 1;
					break;
				}
				// 5 pieces row middle top
				else if(s < config.countRows && array[s][i] === array[s][i+1] && array[s][i] === array[s][i+3] && array[s][i] === array[s][i+4] && array[s][i] === array[s+1][i+2]){
					result.push([s,i], [s,i+1], [s+1, i+2], [s,i+3], [s,i+4]);
					x = 1;
					break;
				}
				// 4 pieces row 3rd bottom
				else if(s+1 < config.countRows && array[s][i] === array[s][i+1] && array[s][i] === array[s][i+3] && array[s][i] === array[s+1][i+2]){
					result.push([s,i], [s,i+1], [s,i+3], [s+1, i+2]);
					x = 1;
					break;
				}
				// 4 pieces row 3rd up
				else if(s-1 >= 0 && array[s][i] === array[s][i+1] && array[s][i] === array[s][i+3] && array[s][i] === array[s-1][i+2]){
					result.push([s,i], [s,i+1], [s,i+3], [s-1, i+2]);
					x = 1;
					break;
				}
				// 4 pieces row 2rd right
				else if(s+1 < config.countRows && array[s][i] === array[s][i+2] && array[s][i] === array[s][i+3] && array[s][i] === array[s+1][i+1]){
					result.push([s,i], [s,i+2], [s,i+3], [s+1, i+1]);
					x = 1;
					break;
				}
				// 4 pieces row 2rd left
				else if(s-1 >= 0 && array[s][i] === array[s][i+2] && array[s][i] === array[s][i+3] && array[s][i] === array[s-1][i+1]){
					result.push([s,i], [s,i+2], [s,i+3], [s-1, i+1]);
					x = 1;
					break;
				}
						
				//0.0, 0.2, 0.3
				else if(array[s][i] === array[s][i+2] && array[s][i] === array[s][i+3]) {
					result.push([s,i],[s,i+2],[s,i+3]);
					x = 1;
					break;
				//0.0, 0.1, 0.3
				} else if (array[s][i] === array[s][i+1] && array[s][i] === array[s][i+3]) {
					result.push([s,i], [s,i+1], [s,i+3]);
					x = 1;
					break;
				}
				//0.0, (+1.1), 0.2 | two separated one on bottom
				else if (s+1 < rows && array[s][i] === array[s][i+2] && array[s][i] === array[s+1][i+1]) {
					result.push([s,i], [s, i+2], [s+1, i+1]);
					x = 1;
					break;	
				}
				//0.0, (-1.1), 0.2 | two separated one top
				else if (s-1 >= 0 && array[s][i] === array[s][i+2] && array[s][i] === array[s-1][i+1]) {
					result.push([s,i], [s, i+2], [s-1, i+1]);
					x = 1;
					break;	
				}
				//0.0, 0.1, 1.3 | two straight one on the right side
				else if (array[s][i] === array[s][i+1] && s+1 < rows && array[s][i+1] === array[s+1][i+1+1]) {
					result.push([s,i], [s, i+1], [s+1, i+1+1]);
					x = 1;
					break;
					//1.1, 1.2, 0.3 | two straight one on the left side
				} else if (array[s][i] === array[s][i+1] && s-1 >= 0 && array[s][i+1] === array[s-1][i+1+1]) {
					result.push([s,i], [s, i+1], [s-1, i+1+1] )
					x = 1;
					break;
				} else if (array[s][i] === array[s][i+1] && (s-1 >= 0 && i-1 >= 0) && array[s][i] === array[s-1][i-1]) {
					result.push([s,i], [s, i+1], [s-1, i-1] )
					x = 1;
					break;
				} else if (array[s][i] === array[s][i+1] && (s+1 !== rows && i-1 >= 0) && array[s][i] === array[s+1][i-1]) {
					result.push([s,i], [s, i+1], [s+1, i-1] )
					x = 1;
					break;
				} 
				
			};
		}
		
		if(result.length === 0){
			return false;
		}else{
			return result;
		}
		
	}

function shuffle(array) {
	var m = array.length, t, i;
  
	// While there remain elements to shuffle…
	while (m) {
  
	  // Pick a remaining element…
	  i = Math.floor(Math.random() * m--);
  
	  // And swap it with the current element.
	  t = array[m];
	  array[m] = array[i];
	  array[i] = t;
	}
	return array;
  }

const reShuffle = () => {
	let getWidthOf = document.getElementById('wrapper-b');
	
	var x = getWidthOf.offsetWidth;
	var y = getWidthOf.offsetHeight;
	let newArray = [];
	let element;
	setTimeout(()=>{
		for(let s = 0; s < config.countRows; ++s) {
			for(let i = 0; i < config.countCols; ++i){	
				element = document.getElementById('gem_' + s  + '_'  + i);
				element.className = 'shuffle wrapper gem ';
				element.style.left = x + "px !important";
				element.style.top = y + "px !important";
				//Need to describe className shuffle
			}
		}
	},1000)
	
	// setTimeout(()=>{
	// 	for(let s = 0; s < rows; ++s) {
	// 		for(let i = 0; i < cols; ++i){	
	// 			element = document.getElementById('gem_' + s  + '_'  + i);
	// 			element.classList.remove("shuffle");
	// 		}
	// 	}
	// },5000)
	components.gems.forEach(element => {
		element.forEach(element1 => {
			newArray.push(element1);
			
		});

	});	
	setTimeout(() => {
		while(!isPosibleTurn(components.gems) && !chekingIsStreak()){
			for(let s = 0; s < config.countRows; ++s) {
				for(let i = 0; i < config.countCols; ++i){	
					element = document.getElementById('gem_' + s  + '_'  + i);
					element.remove();
				}
			}

			shuffle(newArray);
			console.log(newArray);
			createGrid2(newArray);
		}
		// for(let s = 0; s < config.countRows; ++s) {
		// 	for(let i = 0; i < config.countCols; ++i){
		// 		if(!isStreak(s, i)){
		// 			console.log('checked')
		// 		}else {
		// 			// Если группы сбора есть, нужно их удалить
		// 			config.gameState = config.gameStates[3]

		// 			// Отметим все удаляемые гемы
		// 			if( isStreak( player.selectedRow, player.selectedCol ) ) {
		// 				removeGems( player.selectedRow, player.selectedCol );
		// 			}

		// 			if(isStreak(player.posY, player.posX)) {
		// 				removeGems( player.posY, player.posX );
		// 			}

		// 			// Убираем с поля
		// 			gemFade();
					
		// 		}
				
		// 	}
		// }
		
		
		hint(components.gems);
	}, 5001);

	// hint?
	
}

var hintValue= [];

const hint = (componentsArray) => {
	let	result = isPosibleTurn(componentsArray);
	if (result !== false) {
		setTimeout(() => {result.forEach(element => {
			hintValue.push(document.getElementById('gem_' + element[0] + '_' + element[1]));
			hintValue[hintValue.length -1].className = "wrapper gem posible-turn";
		});}, 1000);
	}else {
		//will be reShuffling
		reShuffle();
	}
}

hint(components.gems);

const removeHint = (value) => {
	value.forEach(element => {
		element.classList.remove("posible-turn");
	});
}

// Обработчик клика
function handlerTab ( event, target ) {
	// Если это элемент с классом config.gameClass
	// и
	// Если подходящее состояние игры
	if( target.classList.contains( config.gemClass ) && config.gameStates[ 0 ]) {
		// определить строку и столбец
		let row = parseInt( target.getAttribute( "id" ).split( "_" )[ 1 ] );
		let col =  parseInt( target.getAttribute( "id" ).split( "_" )[ 2 ] );

		// Выделяем гем курсором
		cursorShow();
		components.cursor.style.top = parseInt( target.style.top ) + "px";
		components.cursor.style.left = parseInt( target.style.left ) + "px";

		// Если это первый выбор, то сохраняем выбор
		if( player.selectedRow == -1 ) {
			player.selectedRow = row;
			player.selectedCol = col;
		} else {
			// Если гем находится рядом с первым выбором
			// то меняем их местами
			if ( ( Math.abs( player.selectedRow - row ) == 1 && player.selectedCol == col ) ||
				( Math.abs( player.selectedCol - col ) == 1 && player.selectedRow == row ) ){
					cursorHide();

					// После выбора меняем состояние игры
					config.gameState = config.gameStates[1];

					// сохранить позицию второго выбранного гема
					player.posX = col;
					player.posY = row;

					// поменять их местами
					gemSwitch();
					removeHint(hintValue);
			} else {
				// Если второй выбор произошел не рядом,
				// то делаем его первым выбором.
				player.selectedRow = row;
				player.selectedCol = col;
			}
		}
	}
}

// Меняем гемы местами
function gemSwitch () {
	let yOffset = player.selectedRow - player.posY;
	let xOffset = player.selectedCol - player.posX;

	// Метка для гемов, которые нужно двигать
	document.querySelector("#" + config.gemIdPrefix + "_" + player.selectedRow + "_" + player.selectedCol).classList.add("switch");
	document.querySelector("#" + config.gemIdPrefix + "_" + player.selectedRow + "_" + player.selectedCol).setAttribute("dir", "-1");

	document.querySelector("#" + config.gemIdPrefix + "_" + player.posY + "_" + player.posX).classList.add("switch");
	document.querySelector("#" + config.gemIdPrefix + "_" + player.posY + "_" + player.posX).setAttribute("dir", "1");

	// меняем местами гемы
	$( ".switch" ).each( function() {
		config.movingItems++;

		$(this).animate( {
				left: "+=" + xOffset * config.gemSize * $(this).attr("dir"),
				top: "+=" + yOffset * config.gemSize * $(this).attr("dir")
			},
			{
				duration: 250,
				complete: function() {
					//Проверяем доступность данного хода
					checkMoving();
				}
			}
		);

		$(this).removeClass("switch");
	});
	

	// поменять идентификаторы гемов
	document.querySelector("#" + config.gemIdPrefix + "_" + player.selectedRow + "_" + player.selectedCol).setAttribute("id", "temp");
	document.querySelector("#" + config.gemIdPrefix + "_" + player.posY + "_" + player.posX).setAttribute("id", config.gemIdPrefix + "_" + player.selectedRow + "_" + player.selectedCol);
	document.querySelector("#temp").setAttribute("id",  config.gemIdPrefix + "_" + player.posY + "_" + player.posX);

	// поменять гемы в сетке
	let temp = components.gems[player.selectedRow][player.selectedCol];
	components.gems[player.selectedRow][player.selectedCol] = components.gems[player.posY][player.posX];
	components.gems[player.posY][player.posX] = temp;
}

// Проверка перемещенных гемов
function checkMoving () {
	config.movingItems--;

	// Действуем тольпо после всех перемещений
	if( config.movingItems == 0 ) {

		// Действия в зависимости от состояния игры
		switch( config.gameState ) {

			// После передвижения гемов проверяем на появление групп сбора
			case config.gameStates[1]:
			case config.gameStates[2]:
				// проверяем, появились ли группы сбора
				if( !isStreak( player.selectedRow, player.selectedCol ) && !isStreak( player.posY, player.posX ) ) {
					// Если групп сбора нет, нужно отменить совершенное движение
					// а если действие уже отменяется, то вернуться к исходному состоянию ожидания выбора
					if( config.gameState != config.gameStates[2] ){
						config.gameState = config.gameStates[2];
						gemSwitch();
					} else {
						config.gameState = config.gameStates[0];
						player.selectedRow = -1;
						player.selectedCol = -1;
					}
				} else {
					// Если группы сбора есть, нужно их удалить
					config.gameState = config.gameStates[3]

					// Отметим все удаляемые гемы
					if( isStreak( player.selectedRow, player.selectedCol ) ) {
						removeGems( player.selectedRow, player.selectedCol );
					}

					if(isStreak(player.posY, player.posX)) {
						removeGems( player.posY, player.posX );
					}

					// Убираем с поля
					gemFade();
				}
				break;
			// После удаления нужно заполнить пустоту
			case config.gameStates[3]:
				checkFalling();
				break;
			case config.gameStates[4]:
				placeNewGems();
				break;
		}

	}

}

// Отмечаем элементы для удаления и убираем их из сетки
function removeGems( row, col ) {
	let gemValue = components.gems[ row ][ col ];
	let tmp = row;

	document.querySelector( "#" + config.gemIdPrefix + "_" + row + "_" + col ).classList.add( "remove" );
	let countRemoveGem = document.querySelectorAll( ".remove" ).length;

	if ( isVerticalStreak( row, col ) ) {
		while ( tmp > 0 && components.gems[ tmp - 1 ][ col ] == gemValue ) {
			document.querySelector( "#" + config.gemIdPrefix + "_" + ( tmp - 1 ) + "_" + col ).classList.add( "remove" );
			components.gems[ tmp - 1 ][ col ] = -1;
			tmp--;
			countRemoveGem++;
		}

		tmp = row;

		while ( tmp < config.countRows - 1 && components.gems[ tmp + 1 ][ col ] == gemValue ) {
			document.querySelector( "#" + config.gemIdPrefix + "_" + ( tmp + 1 ) + "_" + col ).classList.add( "remove" );
			components.gems[ tmp + 1 ][ col ] = -1;
			tmp++;
			countRemoveGem++;
		}
	}

	if ( isHorizontalStreak( row, col ) ) {
		tmp = col;

		while ( tmp > 0 && components.gems[ row ][ tmp - 1 ] == gemValue ) {
			document.querySelector( "#" + config.gemIdPrefix + "_" + row + "_" + ( tmp - 1 ) ).classList.add( "remove" );
			components.gems[ row ][ tmp - 1 ] = -1;
			tmp--;
			countRemoveGem++;
		}

		tmp = col;

		while( tmp < config.countCols - 1 && components.gems[ row ][ tmp + 1 ] == gemValue ) {
			document.querySelector( "#" + config.gemIdPrefix + "_" + row + "_" + ( tmp + 1 ) ).classList.add( "remove" );
			components.gems[ row ][ tmp + 1 ] = -1;
			tmp++;
			countRemoveGem++;
		}
	}

	components.gems[ row ][ col ] = -1;

	scoreInc( countRemoveGem );
}

// Удаляем гемы
function gemFade() {
	$( ".remove" ).each(function() {
		config.movingItems++;

		$(this).animate( {
				opacity: 0
			},
			{
				duration: 200,
				complete: function() {
					$(this).remove();
					checkMoving();
				}
			}
		);
	});
}

// Заполняем пустоту
function checkFalling() {
	let fellDown = 0;

	for( j = 0; j < config.countCols; j++ ) {
		for( i = config.countRows - 1; i > 0; i-- ) {

			if(components.gems[i][j] == -1 && components.gems[i - 1][j] >= 0) {
				document.querySelector( "#" + config.gemIdPrefix + "_" + (i - 1) + "_" + j ).classList.add( "fall" );
				document.querySelector( "#" + config.gemIdPrefix + "_" + (i - 1) + "_" + j ).setAttribute( "id", config.gemIdPrefix + "_" + i + "_" + j );
				components.gems[ i ][ j ] = components.gems[ i - 1 ][ j ];
				components.gems[ i - 1 ][ j ] = -1;
				fellDown++;
			}

		}
	}

	$( ".fall" ).each( function() {
		config.movingItems++;

		$( this ).animate( {
				top: "+=" + config.gemSize
			},
			{
				duration: 65,
				complete: function() {
					$( this ).removeClass( "fall" );
					checkMoving();
				}
			}
		);
	});

	// Если все элементы передвинули,
	// то сменить состояние игры
	if( fellDown == 0 ){
		config.gameState = config.gameStates[4];
		config.movingItems = 1;
		checkMoving();
	}
}


// Создание новых гемов
function placeNewGems() {
	let gemsPlaced = 0;

	// Поиск мест, в которых необходимо создать гем
	for( i = 0; i < config.countCols; i++ ) {
		if( components.gems[ 0 ][ i ] == -1 ) {
			components.gems[ 0 ][ i ] = Math.floor( Math.random() * 8 );
			
			createGem2( 0, i * config.gemSize, 0, i, config.imagesCoin[ components.gems[ 0 ][ i ] ] );
			gemsPlaced++;
		}
	}

	// Если мы создали гемы, то проверяем необходимость их сдвинуть вниз.
	if( gemsPlaced ) {
		config.gameState = config.gameStates[ 3 ];
		checkFalling();
	} else {
		// Проверка на группы сбора
		let combo = 0

		for ( i = 0; i < config.countRows; i++ ) {
			for ( j = 0; j < config.countCols; j++ ) {

				if ( j <= config.countCols - 3 && components.gems[ i ][ j ] == components.gems[ i ][ j + 1 ] && components.gems[ i ][ j ] == components.gems[ i ][ j + 2 ] ) {
					combo++;
					removeGems( i, j );
				}
				if ( i <= config.countRows - 3 && components.gems[ i ][ j ] == components.gems[ i + 1 ][ j ] && components.gems[ i] [ j ] == components.gems[ i + 2 ][ j ] ) {
					combo++;
					removeGems( i, j );
				}

			}
		}

		// удаляем найденные группы сбора
		if( combo > 0 ) {
			config.gameState = config.gameStates[ 3 ];
			gemFade();
		} else { 
			// Запускаем основное состояние игры
			config.gameState = config.gameStates[ 0 ];
			player.selectedRow= -1;
			hint(components.gems);
		}
	}
}