new Vue({
    el:"#app",
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning:false,
        turns:[]
    },
    methods:{
        startNewGame:function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack:function(){
            var damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer:false,
                heal:false,
                text:"Monster hits player for : "+ damage
            });
            if(this.checkwin()){
                return;
            }
            // this.checkwin();


            this.monsterAttack();
        },
        monsterAttack:function(){
            var damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer:true,
                heal:false,
                text:"Player hits monster for : "+ damage
            });
            this.checkwin();
        },
        specialAttack:function(){
            var damage = this.calculateDamage(10,20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer:false,
                heal:false,
                text:"Player hits monster hard for : "+ damage
            });
            if(this.checkwin()){
                return;
            }
            this.monsterAttack();
        },
        heal:function(){
            
            if(this.playerHealth <= 90){
                this.playerHealth +=10;
            }else{
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer:true,
                heal:true,
                text:"Player heals for 10"
            });
            this.monsterAttack();
        },
        giveUp:function(){
            this.gameIsRunning = false;
        },
        calculateDamage:function(min,max){
            return Math.max(Math.floor(Math.random() * max ) + 1,min);
        },
        checkwin:function(){
            if(this.monsterHealth <= 0){
                if(confirm("you win! New Game?")){
                    this.startNewGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }else if(this.playerHealth <= 0){
                if(confirm("you lost! New Game?")){
                    this.startNewGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
})