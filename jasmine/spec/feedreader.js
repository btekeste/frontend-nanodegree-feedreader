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
            expect(allFeeds).toBeTruthy();
        });

        /* Loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL
         * is not empty.
         */
        it('urls are defined', () => {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeTruthy();
            });
        });

        /* Loops through each feed in the allFeeds object and 
         * ensures it has a name defined and that the name
         * is not empty.
         */
        it('names are defined', () => {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeTruthy();
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
            expect(document.querySelector('body').classList).toContain('menu-hidden');
        });

         /* Test that ensures the menu changes visibility when the menu
          * icon is clicked. This test should have two expectations:
          * does the menu display when clicked and does it hide when
          * clicked again.
          */
        it('is switching on click', function() {
            document.querySelector('.menu-icon-link').click();
            expect(document.querySelector('body').classList).not.toContain('menu-hidden');

            document.querySelector('.menu-icon-link').click();            
            expect(document.querySelector('body').classList).toContain('menu-hidden');
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
            expect(document.querySelectorAll('.feed .entry').length).not.toBe(0);
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
            loadFeed(0,function() {
                for (const feed of feeds.children) {
                    firstFeedLoad.push(feed.innerText);
                }   
                loadFeed(1,done);
            });
        });
       
        it('changes content', function() {
            for (const feed of feeds.children) {
                secondFeedLoad.push(feed.innerText);
            }

            for (const [feedPosition, elementInFirst] of firstFeedLoad.entries()) {
                expect(elementInFirst).not.toBe(secondFeedLoad[feedPosition]);
            }
        });

    });         

}());
