var obj1 = {
  outer: function () {
    console.log(this);

    var self = this;
    var innerFunc = function () {
      console.log(self);
    };
    innerFunc();
  },
};

obj1.outer();
