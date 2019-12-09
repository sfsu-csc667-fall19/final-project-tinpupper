require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connect = require("../mongo/connect");
const Review = require("../models/review.model");

const app = express();
const port = 3013;
const mongoUrl =
  "mongodb+srv://john:123@cluster0-c6e3j.mongodb.net/test?retryWrites=true&w=majority";

/* * * * * * * * * * * *
 * CONNECT TO DATABASE *
 * * * * * * * * * * * */
connect(mongoUrl)
  .then(async connection => {
    console.log("Connected to database in RESTAURANT");
  })
  .catch(e => {
    console.error(
      "+_+_+_+_+ Failed to connect to database in RESTAURANT +_+_+_+_+"
    );
  });

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* * * * * * * * * * * * * *
 * GET Single Review by ID *
 * * * * * * * * * * * * * */
app.get(`/review/:id`, async (req, res) => {
  // 0) Look at "services/restaurantServer" and look for the giant "GET RESTAURANT" comment box for how to do it
  console.log(`Finding review...`);
  // 1) Get id from req.params.id
  const { id } = req.params.id;
  // 2) Use Review.findById to get review and store inside "result" variable
  const result = await Review.findById(id).exec();
  // 3) Check if "result" is null (see the file in step 0)
  if (!result) message = "Unable to get review"; 
  // 4) res.send in the format below:
  res.status(200).send({
    message,
    review: result
  });
  /**
   * {
   *    message: "Found review",
   *    userId: result.userId,
   *    text: result.text,
   *    restaurantId: result.restaurantId
   * }
   */
});

/* * * * * * * * * * * * *
 * POST Review           *
 * * * * * * * * * * * * */
app.post(`/review`, (req, res) => {
  // 0) Look at "services/registerServer" and look for the giant "REGISTER NEW USER" comment box for how to do it
  console.log(`Attempting to post...`);
  // 1) Get restaurantId, userId, and text from
  //     - req.body.restaurantId & req.body.userId & req.body.text
  const { restaurantId, userId, text} = req.body;
  // 2) Use Review.create to create the review. See file in step 0.
  Review.create({ restaurantId, userId, text }, (err, review) => {
    //Failed to create new review
    if (err) {
      console.log('Review failed to post...');

      return res.status(400).send({
        error: err.message,
        message: 'The review probably exists in the database or a field is empty',
      });
    }
    console.log('Review sucessfully posted!')
  // 4) res.send in the format below:
    return res.send({
      message: 'Successfully posted review!',
      userId: userId,
      text: text,
      restaurantId: restaurantId
    });
  });
  /**
   * {
   *    message: "Successfully posted review",
   *    userId: userId,
   *    text: text,
   *    restaurantId: restaurantId
   * }
   */
});

/* * * * * * * * * * * * *
 * UPDATE Review         *
 * * * * * * * * * * * * */
app.put("/review/:id", (req, res) => {
  // 0) Look at "services/userService" and look for the giant "UPDATE SINGLE USER" comment box for how to do it
  let message = "Updated Review!";
  // 1) Get id from req.params.id &  Get text from req.body.text
  const { id } = req.params;
  const { text } = req.body;
  // 2) Use Review.findByIdAndUpdate to get review and store inside "updated" variable
  //    - Only update the "text" field
  const updated = await Review.findByIdAndUpdate(id, { text }, { new: true });
  // 3) Check if "updated" is null (see the file in step 0)
  if (!updated) message = "Unable to update review!"
  // 4) res.send in the format below:
  res.status(200).send({
    message,
    userId: updated.userId,
    text: updated.text,
    restaurantId: updated.restaurantId
  });  
  /**
   * {
   *    message: "Updated review",
   *    userId: updated.userId,
   *    text: updated.text,
   *    restaurantId: updated.restaurantId
   * }
   */
});

/* * * * * * * * * * * * * * *
 * DELETE Review by ID   *
 * * * * * * * * * * * * * * */
app.delete(`/review/:id`, (req, res) => {
  // 0) Look at "services/restaurantServer" and look for the giant "DELETE RESTAURANT" comment box for how to do it
  console.log('Attempting to delete review by Id..')
  // 1) Get id from req.params.id
  const { id } = req.params;
  // 1.5) let message = 'Successfully deleted review';
  let message = 'Successfully deleted review';
  // 2) Use Review.findByIdAndRemove to delete review and store inside "remove" variable
  const remove = await Review.findByIdAndRemove(id, { useFindandModify: false}).exec();
  // 3) Check if "remove" is null (see the file in step 0)
  if(!remove) message = 'Unable to remove review'
  // 4) res.send in the format below:
  res.status(200).send({
    message,
    userId: remove.userId,
    text: remove.text,
    restaurantId: remove.restaurantId
  });
  /**
   * {
   *    message: "Deleted review",
   *    userId: remove.userId,
   *    text: remove.text,
   *    restaurantId: remove.restaurantId
   * }
   */
});

app.listen(port, () => console.log(`REVIEW: ${port}!`));
