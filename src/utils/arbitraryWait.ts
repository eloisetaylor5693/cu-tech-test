/**
 * Add arbitrary wait so you can see the loading message.
 * The request returns so quickly that you can't see the loading message in the UI.
 * This is because I can't retrieve more than 10 results from the TV Maze API, and so I made the paging value 3 instead of 10.
 */
const WaitSoYouCanSeeTheLoadingLogic = async () => {
  console.log("waiting so you can see the loading logic");
  await new Promise((resolve) => setTimeout(resolve, 900));
};

export default WaitSoYouCanSeeTheLoadingLogic;
