import firebase from "firebase";

export async function updateQuestion(request) {
    var root = firebase.database().ref();

    var response = {};

    let updateObject = {}

    updateObject["order_questions/" + request.orderID + "/" + request.questionID + "/answer"] = request.answer;

    const error_update_question = await root.update(updateObject);

    if (error_update_question) {
        response["error"] = error_update_question;
    } else {
        response["question_id"] = request.question_id;
    }

    return response;
}