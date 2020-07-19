var mongoose = require('mongoose'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment');

let data = [
	{
		name: "Cloud's Rest",
		image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum mollitia velit natus consequuntur ipsa reiciendis libero sequi, sed tempora enim nulla voluptatum minus quos molestiae, accusamus excepturi corporis tenetur ad! Iusto dolorem perspiciatis soluta consequatur ipsum quam architecto dicta, temporibus maiores vel minus cum labore ullam nulla debitis amet harum ab adipisci ad. Error aspernatur ducimus nemo repudiandae in soluta cupiditate incidunt vitae non voluptatem nostrum, alias ut repellat dolor aliquam odit cumque praesentium excepturi perferendis sequi. Quas fugiat sit unde et, voluptate, distinctio aperiam repudiandae nemo placeat expedita asperiores inventore maxime! Aperiam, magni tempore esse minima blanditiis quam at modi assumenda aliquid molestiae consequuntur suscipit. Obcaecati, nisi in! Doloremque, quae totam? Alias assumenda consequuntur pariatur aliquid, molestiae eligendi nesciunt ipsa veniam vel architecto nulla cum corrupti inventore deserunt incidunt similique odit at numquam. Officia eligendi unde quidem, ipsum sed consectetur laudantium quaerat quo inventore quis, odit voluptate repellendus modi.'
	},
	{
		name: 'Desert Mesa',
		image: 'https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
	},
	{
		name: 'Canyon Floor',
		image: 'https://farm1.staticflickr.com/189/493046463_841a18169e.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
	}
];

async function seedDB() {
	//Remove all campgrounds
	try {
		await Campground.deleteMany({});
		console.log('campground removed');
		await Comment.deleteMany({});
		console.log('comment removed');

		// for (const seed of data) {
		// 	let campground = await Campground.create(seed);
		// 	console.log('Campgrounds  created');
		// 	let comment = await Comment.create({
		// 		text: 'this place is great, but i wish there was internet.',
		// 		author: 'ap'
		// 	});
		// 	console.log('comments created');
		// 	campground.comments.push(comment);
		// 	campground.save();
		// 	console.log('comments added to campground');
		// }
	} catch (err) {
		console.log(err);
	}

	//add a few comments
}
// function seedDB() {
// 	//Remove all campgrounds
// 	Campground.remove({}, function(err) {
// 		if (err) {
// 			console.log(err);
// 		}
// 		console.log('removed campgrounds!');
// 		Comment.remove({}, function(err) {
// 			if (err) {
// 				console.log(err);
// 			}
// 			console.log('removed comments!');
// 			//add a few campgrounds
// 			data.forEach(function(seed) {
// 				Campground.create(seed, function(err, campground) {
// 					if (err) {
// 						console.log(err);
// 					} else {
// 						console.log('added a campground');
// 						//create a comment
// 						Comment.create(
// 							{
// 								text: 'This place is great, but I wish there was internet',
// 								author: 'Homer'
// 							},
// 							function(err, comment) {
// 								if (err) {
// 									console.log(err);
// 								} else {
// 									campground.comments.push(comment);
// 									campground.save();
// 									console.log('Created new comment');
// 								}
// 							}
// 						);
// 					}
// 				});
// 			});
// 		});
// 	});
// 	//add a few comments
// }
module.exports = seedDB;
