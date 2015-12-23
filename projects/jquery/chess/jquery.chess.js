/*
 * Copyright 1 KB Chess 			: Óscar Toledo, Andrés Moreno - http://1kchess.an3.e
 * Copyright jQuery Chess Plugin 	: Subin Siby - http://subinsb.com
*/

/* ----------------
 * Chess Core BEGIN
 * ----------------
*/

// aliases and constants
function chessElem(i){return document.getElementById('c'+i)}
String.prototype.U=String.prototype.charCodeAt;M=Math.random;W=setTimeout;X=10;Q=15;H=1e4;
// 1K chess (1024 bytes)
function F(c,e,S,h,s){if(c<9){c^=8;for(var T,o,L,E,D,O=20,N=-1e8,d=S&&F(c)>H,K=78-h<<9,a=c?X:-X,G,n,g,C,R,A;O++<98;)if((o=I[T=O])&&(G=o&Q^c)<7){A=G--&2?8:4;C=9-o&Q?l[61+G]:49;do{R=I[T+=l[C]];g=D=G|T+a-e?0:e;if(!R&&G|A<3|g||(1+R&Q^c)>9&&G|A>2){if(!(2-R&7))return K;for(E=n=G|I[T-a]-7?o&Q:6^c;E;E=!E&!d&&!(g=T,I[D=T<O?g-3:g+2]<Q|I[D+O-T]|I[T+=T-O])){L=(R&&l[R&7|32]*2-h-G)+(G?0:n-o&Q?110:(D&&14)+(A<2)+1);if(S>h||1<S&S==h&&L>2|d){I[T]=n,I[g]=I[D],I[O]=D?I[D]=0:0;L-=F(c,E=G|A>1?0:T,S,h+1,L-N);if(!(h|S-1|B-O|T-b|L<-H))return F(B=b),y=E,c&&W("F(8,y,2,0),F(8,y,1,0)",O);E=1-G|A<7|D|!S|R|o<Q||F(c)>H;I[O]=o;I[T]=R;I[D]=I[g];D?I[g]=G?0:9^c:0}if(L>N|!h&L==N&M()*2)if(N=L,S>1)if(h?s<L:(B=O,b=T,0))return N}}}while(!R&G>2||(T=O,G|A>2|Q<o&!R&&++C*--A))}return 768-K<N|d&&N}for(i=20;i<98;chessElem(i).innerHTML="&#"+(I[i]&Q?9808+l[67+(I[i]&Q)]:9)+";")chessElem(i+=i%X-8?1:3).lang=i-B}for(B=y=0,I=[],l=[];B<120;I[B++]=B%X?B/X%X<2|B%X<2?7:B/X&4?0:l[y++]:7)l[B]="ustvrtsuqqqqqqqqyyyyyyyy}{|~z|{}@G@TSb~?A6J57IKJT576,+-48HLSUmgukgg OJNMLK  IDHGFE".U(B)-64;

/* --------------
 * Chess Core END
 * -------------- 
*/
function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}
(function($){
	$.fn.chess = function(){
		return this.each(function(){
			var elem = randomString();
			$(this).addClass(elem);
			var elem = "." + elem;
			var blackPieces = [
				"&#9820;", "&#9822;", "&#9821;", "&#9819;", "&#9818;", "&#9821;", "&#9822;", "&#9820;"
			];
			var whitePieces = [
				"&#9814;", "&#9816;", "&#9815;", "&#9813;", "&#9812;", "&#9815;", "&#9816;", "&#9814;"
			];
			$('<style>'+ elem +' table {margin:.5em auto 0;border:solid indianred;border-width:0 1em}'+ elem +' td {text-align: center;width:1.04em;height:1.04em;overflow:hidden;font:4em/1 "MS Gothic","Segoe UI Symbol","DejaVu Sans";cursor:pointer;background:#f0d9b5;}'+ elem +' td[lang="0"] {outline:thin solid #a00;color:#800}'+ elem +' tr:nth-child(odd) td:nth-child(even), '+ elem +' tr:nth-child(even) td:nth-child(odd) {background:tan}</style>').appendTo("body");
			var board = "<table class='chessBoard'><tbody>";
				for (i = 1; i < 9; i++){
					board += "<tr>";
						for(p = 0; p < 8; p++){
							var block = ( (i * 10) + 11 ) + p;
							if( i == 1 || i == 8 ){
								piece = i == 1 ? blackPieces[p] : whitePieces[p];
							}else if( i == 2 || i == 7){
								piece = i == 2 ? "&#9823;" : "&#9817;";
							}else{
								piece = "";
							}
							board += "<td data-id='"+ block +"' id='c"+ block +"'>"+ $("<span></span>").html(piece).html() +"</td>";
						}
					board += "</tr>";
				}
			board += "</tbody></table>";
			$(this).html(board);
			
			/* Add event listeners */
			$(document).on("click", elem + " .chessBoard td", function(){
				id = $(this).data("id");
				I[b = id] & 8 ? F(B=b) : F(0, y, 1, 0);
			});
		});
	};
})(jQuery);