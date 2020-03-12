function balls(){

    let canvas = document.querySelector('canvas');  //bltynbabwbhetv canvas
    let ctx = canvas.getContext('2d');  //контекст 2D

    let width = canvas.width = window.innerWidth;   //Задаём значения ширины и высоты на весь экран
    let height = canvas.height = window.innerHeight;//и записываем их в переменные 

    function random(min,max) {  //отдельная функция для генерации случайных чисел

        let num = Math.floor(Math.random()*(max-min)) + min;
        return num;

    }

    function Ball(x, y, velX, velY, color, size){ //Функция создания объекта мяча, к ней код обращается позже
                                                  //По сути, это макет объекта  
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;

    }

    Ball.prototype.draw = function(){ //Функция рисования мячей в общем виде, без заданных свойств для объекта Ball

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();

    }

    Ball.prototype.otskok = function(){ //функия, дающая отскок от границ для объекта Ball

        if((this.x + this.size) >= width){ //если мяч касается границы, меняем направление
        this.velX = -(this.velX);          //движения vel на противоположное
        }
        if((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
        }
        if((this.y + this.size) >= height) {
        this.velY = -(this.velY);
        }
        if((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
        }
        this.x += this.velX;
        this.y += this.velY;

    }

    let balls = []; //создание массива с мячами
    while(balls.length < 20){   //величина массива на 20 мячей

        let size = random(20,50); //функция, генерирующая рандомный размер

        let ball = new Ball(  //Задаём рандомные свойства мячам (см. функцию создания мячей)
        random(0 + size,width - size), //X
        random(0 + size,height - size),//Y
        random(-10,10), //VelX
        random(-10,10), //VelY, при болшьем числе увеличится скорость
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')', //color, генерирование цвета
        size //Заданный в функции size размер
        );

        balls.push(ball); //добавляем мячи в массив
    }

    function loop(){ ///функция, приводящяя всё в действие

    ctx.fillStyle = 'rgba(0,0,0,0.25)'; //заливка фона
    ctx.fillRect(0,0,width,height);
    
    for(let i = 0; i < balls.length; i++){ //рисуем шарики из массива

        balls[i].draw();    //функция рисования заданных в массиве шариков
        balls[i].otskok();  //функция, присваивающая отскоки этим шарикам

    }

    requestAnimationFrame(loop); //
    }

    loop(); //Запускаем анимацию
}