var orientation = require("../build/Release/jpegexiforient");
var lwip = require("lwip");


function autoRotate(source, destination, cb) {
	console.log("Checking " + source);
	orientation.orientation(source, function(err, val) {
		if (err) return cb(err);

		lwip.open(source, function(err, img){
			if (err) return cb(err);

			img = img.batch();

			switch (val) {
				case 1: 	//	top-left  - no transform
					break;
				case 2: 	//	top-right - flip horizontal
					img = img.mirror('y');
					break;
				case 3: 	//	bottom-right - rotate 180
					img = img.rotate(180, "black");
					break;
				case 4: 	//	bottom-left - flip vertically
					img = img.mirror('x');
					break;
				case 5: 	//	left-top - rotate 90 and flip horizontal
					img = img.rotate(90, "black").mirror('y');
					break;
				case 6: 	//	right-top - rotate 90
					img = img.rotate(90, "black");
					break;
				case 7: 	//	right-bottom - rotate 270 and flip horizontal
					img = img.rotate(270, "black").mirror('y');
					break;
				case 8: 	//	left-bottom - rotate 270
					img = img.rotate(270, "black");
					break;
			}

			img.writeFile(destination, function(err) {
				orientation.orientation(destination, 1, cb);
			});

		});
	});
}

exports.autoRotate = autoRotate;
