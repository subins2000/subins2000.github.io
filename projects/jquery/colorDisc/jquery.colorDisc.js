/*
| jQuery Newton Color Disc Plugin
| Copyright Subin Siby 2014
| http://subinsb.com/newton-color-disc
*/

Raphael.fn.pieChart = function (cx, cy, r, colors) {
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();
    function sector(cx, cy, r, startAngle, endAngle, params) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }
    var angle = 0,
        total = 0,
        start = 0;
	for (var i = 0, ii = colors.length; i < ii; i++) {
		total += colors[i].size;
    }
    $.each(colors, function(i, item){
		var color = item.color,
			value = item.size,
			angleplus = 360 * value / total,
			popangle = angle + (angleplus / 2),
			ms = 500,
			delta = 30,
			bcolor = Raphael.hsb(start, 1, 1),
			p = sector(cx, cy, r, angle, angle + angleplus, {fill: color, stroke: "none", "stroke-width": 0});
		angle += angleplus;
		chart.push(p);
		start += .1;
    });
    return chart;
};

jQuery.fn.colorDisc = function(methodOrOptions){
	var methods = {
			init : function(colors){
				if(typeof colors == "undefined"){
					colors = ["red", "green", "blue"];
				}
				sectorColors = [];
				sectorSize = parseInt(360 / colors.length, 10);
				$.each(colors, function(i, value){
					sectorColors.push({
						size: sectorSize,
						color: value
					});
				});
				this.find("#colorDisc").remove();
				this.append("<div id='colorDisc'></div>");
				paper = Raphael(this.find('#colorDisc')[0], 400, 400).pieChart(200, 200, 200, sectorColors);
			},
			remove : function(){
				this.find("#colorDisc").remove();
			},
			speed : function(speed){
				var elem = this.find("#colorDisc");
				var currentSpeed 	= elem.css("-webkit-animation-duration");
				var newSpeed 		= parseFloat(currentSpeed) - 0.05;
				var newSpeed		= String(newSpeed).replace("-", "");
				if(speed != null){
					newSpeed = speed;
				}
				elem.removeClass("active");
				elem.attr("style", "-webkit-animation-duration:" + newSpeed + "s;" + "-moz-animation-duration: "+ newSpeed + "s;");
				setTimeout(function(){
					elem.addClass("active");
				}, 10);
			}
	};
	if(typeof methodOrOptions == "object" || !methodOrOptions){
		return methods.init.apply( this, arguments );
	}else if(typeof methodOrOptions == "string" && methods[ methodOrOptions ]){
		return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	}
};