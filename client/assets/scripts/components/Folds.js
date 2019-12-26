
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        _folds:null,
    },

    // use this for initialization
    onLoad: function () {
        if(cc.vv == null){
            return;
        }
        
        this.initView();
        this.initEventHandler();
        
        this.initAllFolds();
    },
    
    initView:function(){
console.log('Flod.js initView is called******************');
        this._folds = {};
        var game = this.node.getChildByName("game");
        var sides = ["myself","right","up","left"];

        const numberPlayers = cc.vv.gameNetMgr.conf.numberPlayers;
        if (numberPlayers == 3) {
            sides = ["myself","right","left"];
        } else if (numberPlayers == 2) {
            ["myself","up"];
        }

        for(var i = 0; i < sides.length; ++i){
            var sideName = sides[i];
            var sideRoot = game.getChildByName(sideName);
            var folds = [];
            var foldRoot = sideRoot.getChildByName("folds");
            for(var j = 0; j < foldRoot.children.length; ++j){
                var n = foldRoot.children[j];
                n.active = false;
                var sprite = n.getComponent(cc.Sprite); 
                sprite.spriteFrame = null;
                folds.push(sprite);            
            }
            this._folds[sideName] = folds; 
        }
        
        this.hideAllFolds();
    },
    
    hideAllFolds:function(){
        for(var k in this._folds){
            var f = this._folds[i];
            for(var i in f){
                f[i].node.active = false;
            }
        }
    },
    
    initEventHandler:function(){
        var self = this;
        this.node.on('game_begin',function(data){
           self.initAllFolds();
        });  
        
        this.node.on('game_sync',function(data){
            self.initAllFolds();
        });
        
        this.node.on('game_chupai_notify',function(data){
            self.initFolds(data);
        });
        
        this.node.on('guo_notify',function(data){
            self.initFolds(data);
        });
    },
    
    initAllFolds:function(){
        var seats = cc.vv.gameNetMgr.seats;

        console.log('Folds.js.initAllFolds--> is called with seats : ', seats);
        for(var i in seats){
            //this.initFolds(seats[i]);
            setTimeout(this.initFolds(seats[i]),10000);
        }
    },
    
    initFolds:function(seatData){
  console.log('Folds.initFolds --> is called seatData:', seatData);

        var folds = seatData.folds;
        console.log('Folds.initFolds --> is called folds:', folds);
        if(folds == null){
            return;
        }

        var localIndex = cc.vv.gameNetMgr.getLocalIndex(seatData.seatindex);
        var pre = cc.vv.mahjongmgr.getFoldPre(localIndex);
        console.log('Folds.initFolds --> is called pre:', pre);
        var side = cc.vv.mahjongmgr.getSide(localIndex);
        console.log('Folds.initFolds --> is called side:', side);

        var foldsSprites = this._folds[side];

        console.log('Folds.initFolds --> is called foldsSprites.length:', foldsSprites.length);

        for(var i = 0; i < foldsSprites.length; ++i){
            var index = i;
            if(side == "right" || side == "up"){
                index = foldsSprites.length - i - 1;
            }
            var sprite = foldsSprites[index];
            sprite.node.active = true;
            this.setSpriteFrameByMJID(pre,sprite,folds[i]);
        }
        for(var i = folds.length; i < foldsSprites.length; ++i){
            var index = i;
            if(side == "right" || side == "up"){
                index = foldsSprites.length - i - 1;
            }
            var sprite = foldsSprites[index];
            
            sprite.spriteFrame = null;
            sprite.node.active = false;
        }  
    },
    
    setSpriteFrameByMJID:function(pre,sprite,mjid){
        sprite.spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID(pre,mjid);
        sprite.node.active = true;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
