/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL
         * is not empty.
         */
        it('urls are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Loops through each feed in the allFeeds object and 
         * ensures it has a name defined and that the name
         * is not empty.
         */
        it('names are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });

    });


    /* Test suite named "The menu" */
    describe('The menu', function() {

        /* Test that ensures the menu element is hidden by default.
         * It analyzes the HTML and the CSS to determine how we're
         * performing the hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect(document.getElementsByClassName('menu-hidden').length).not.toBe(0);
        });

         /* Test that ensures the menu changes visibility when the menu
          * icon is clicked. This test should have two expectations:
          * does the menu display when clicked and does it hide when
          * clicked again.
          */
        it('is switching on click', function() {
            document.querySelector('.menu-icon-link').click();
            expect(document.getElementsByClassName('menu-hidden').length).toBe(0);

            document.querySelector('.menu-icon-link').click();            
            expect(document.getElementsByClassName('menu-hidden').length).not.toBe(0);
        });

    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed function is called and
         * completes its work, there is at least a single .entry element
         * within the .feed container. Note: loadFeed() is asynchronous
         * so this test will require the use of Jasmine's beforeEach and
         * asynchronous done() function.
         */         
        beforeEach(function(done) {
            loadFeed(0,done);
        });

        it('exist', function() {
            expect(document.querySelector('.feed').children.length).not.toBe(0);
        });

    });

         
    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* Test that ensures when a new feed is loaded by the loadFeed
         * function that the content actually changes. Note: loadFeed()
         * is asynchronous.
         */        
        const feeds = document.querySelector('.feed');
        const firstFeedLoad = [];
        const secondFeedLoad = [];

        beforeEach(function(done) {
            loadFeed(0);
            Array.from(feeds.children).forEach(function(feed) {
                firstFeedLoad.push(feed.innerText);
            });
            loadFeed(1,done);
        });
       
        it('changes content', function() {
            Array.from(feeds.children).forEach(function(feed) {
                secondFeedLoad.push(feed.innerText);
            });

            firstFeedLoad.forEach(function (first, feedPosition) {
                expect(first).not.toBe(secondFeedLoad[feedPosition]);
            });
        });

    });         

}());
