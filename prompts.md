so yout task is to https://airbnb-clone-umber-two.vercel.app/ clone this website there is no need to make backend but the whole file structure and endpoints should be in a way that it should be scalable, So that i can add new feature and pages if needed basically it should be scalalble and follows open close principle if any of the .md file skills matches what subtask you are currently doing then you should follow the instructure in the and references there are so many skills that i have added similaly in agents too so use it when needed Primary Focus: Absolute visual and behavioral fidelity, smooth animations/transitions, keyboard accessibility, and clean project architecture. No direct codebase duplication. breakdown entire project in different phases around 5-6 and before starting every phase give me the plan in .md file and put it in planning folder based upon your plan i will state my requirements if there are any or changes that i think in your plan so go on.


and you won't be able to see the website as there is bot restriction so i am here to providde you with screenshot so here are list of screenshot for the page

and we have only one page in the clone page 
so first you will give me the 5 phase plan 
i will review it 
and then you give each phase i will validate and give you screenshots
-------------------------------------------------
start phase 1 and setup the project
then i will give you detailed prompt and screenshot about the eExpandable Search Pill, search popover panels and other things
-------------------------------------------------

start with first phase 
this are the screenshot 

it should be optmised when zoomed in and zoomed out 

it should have Sticky Header containing a Compact Search Bar (or Search Pill / Search Bar Container).
Brand Logo: Left-aligned Airbnb logo.

Search Bar / Pill: A centered pill-shaped search input divided into three interactive segments ("Anywhere", "Anytime", "Add guests") ending with a rounded search button/icon.

User Action Menu: Right-aligned section with "Become a host", language selector icon, and a user profile/hamburger menu dropdown button.

as given in the screenshot

------------------------------------------------------

https://www.airbnb.co.in/

from this original website you have to extrct the airbnb logo 

and then you dont have to take reference form this webstie

as we are trying to clone the another website whci is a clone given to me as the target not this 

after that you can move on to phase 3

below the screenshot there is footer and review tooo
but that will do in next phase

----------------------------------------------------

below comment is this
so move onto the enxt phase 
your task is to make the exact mimic of htis
also maintaining the scalability and amke the page experience smooth
apart from this 
there is issuein 4th screenshot where there is pricing 
you are overshadowing the price get10% off section
it show also move with price right

----------------------------------------------------


et's set up the Full-Screen Photo Tour Modal (`?modal=PHOTO_TOUR_SCROLLABLE`). Here’s how I want it to look and work:
Modal Trigger & URL Sync
- Opening any image or clicking "Show all photos" should pop up a full-screen overlay (no page reloads).
- Sync the modal state with the URL using `?modal=PHOTO_TOUR_SCROLLABLE`. 
- Closing it via the back button or `Esc` key should clear the query param and return to the main view.

2. Header
- Fixed bar at the top:
  - left: Back arrow (`<`) to exit.
  - Center: "Photo tour" heading.
  - Right: Share & Save (heart) icons.

Layout & Scroll Behavior
Build a two-column section under the header:
Left Side (Sticky Category): 
  - Show the current section name (e.g., "Living room 2") and its amenities below it.
  - Make this stick to the top as I scroll through photos in that section (`position: sticky`). When I reach a new category (like "Kitchen"), the old title should push up and the new title takes over.
-Right Side (Photos): 
  - A vertical feed of photos for that category particular category which we are seeing(mix of full-width images and 2-column grids).

Implementation sholud be
- Group photo data by category (e.g., `[{ category: "Living room 1", subtext: "Sofa · AC", images: [...] }, ...]`).
Use CSS `sticky` or an `IntersectionObserver` so the left title perfectly mirrors whichever photo section is currently in view.

---------------------------------------------

Hey, we need to fix two specific behavior of our current photo tour subpage. So in that photo tour model, model is equal to photo_tour_scrollable. The first thing I need you to change is scroll to image on click. So when I click a specific photo from the main page grid, one of the open the photo tour model and automatically auto scroll the gallery down directly to that specific image location, right? The another thing I want you to do is sticky section header per image group. Each photo category like living room one, kitchen should act as self-contained section wrapper. Inside each section, the left label title plus subtext must be positioned sticky top header height. So the scroll behavior should be like as I scroll through the photo of living room one, living room one label stays pinned on the left. The moment the last photo of living room leaves the view and the kitchen photo starts, the living room one title scroll out naturally and kitchen label smoothly takes over and takes and stays pinned for its photo.

--------------------------------------------

there is issue when in photo tour, when clint opens the full photo, the photo background is black in our case, but it should be white.
then the current photo number is not properly written
in our case: it is 4/15 in the center part of the header
while it sould be at right. side of the header before X with this format: 4 of 15.

also add a 6 dot matrix kind of indicator at the top left of the photo view which returns client to photo tour. 
while the right top header cross will bring client to main page

also change the buttons as given in the image
left side is desired while right side is current implementation

---------------------------------------------------

there is one mjor flow in the system
the header which we have is sticky that means it appears through out th page 
but waht we want is only (photos, amenities reviews location with price header to be only sticvky)
screenshot have difference 
we have the right one and desired is left
and second screenshot have other details 
so try to fix

and change the symbol

and in show all photos in main menu should have 9 dots type of pattern in the same way in full image too

----------------------------------------------------
 Refactor this please: Dynamic Sticky Boundary & Full-Width Container Below Calendar**Problem:** Currently, the right-hand booking widget card (remains fixed (`sticky`) indefinitely down the page, squeezing subsequent sections (Reviews, Ratings, Location) into the left column. theTarget Behavior be (Pixel-Perfect Alignment):1 Sticky Boundary Unmount/Stop : The booking widget must ONLY remain sticky alongside the main content up to the **Calendar section**. Once the user scrolls past the Calendar section, the floating card should stop following/sticking.2. Full-Width Section Breakdown :- The primary listing layout uses a 2-column grid  strictly from the main section down to the Calendar.   - Directly below the Calendar boundary, transition the container into a single full-width layout .   Sections like Guest Favourite badge, Overall Ratings Breakdown, Reviews Grid, and Map/Location must span the full width of the container (`w-full`), matching the exact reference layouut given in the image.

left-> desired 
right-> current

-----------------------------

look at the target image which is left one
the box for reserve have more circular edges as compared to our right one 

the parition after calender is till the page right end 

the 4.95 rating font is larger 
and have a leaf type of boundary which i want exactly that


if you want the exact measurement for each of them 

https://www.airbnb.co.in/rooms/1682655368162041390?check_in=2026-10-02&check_out=2026-10-04&adults=1&children=0&infants=0&pets=0&source_impression_id=p3_1786079150_P3_8fwOCsxxdxX_o

take referecne from this website 
wheere you can extract the font size and other arrangement
make sure you are not changing the screenshot architecture 
because that is what we have to clone not the real airbnb

also there is issue in cleanliness accuracy check in and all type of tags 
which you can get from the link 
and make it similar to the screenshot

the tags should be above parition not below it 
follow the screenshot 
if you need resources than go to link for measurement and svgs

--------------------------------

So, there are a few issues with you need to resolve. So, the first issue is overall rating column, which is in the left side. Only the overall rating column should feature horizontal distribution bars, stack the five down to one, and keep this stacked bar chart strictly in the first column, right? And the second issue is category rating, which is like cleanliness, check-in, location, etc. Remove all progress bars from it and change the layout for each category to a vertical stack. Top category name, middle is the rating score, and the bottom one is the category icon. Arrange these categories horizontally in a row across six columns, separated by a subtle vertical border dividers. And the third is sticky sub-header navigation. Ensure the secondary tab bar, which is photos, amenities, etc., appears fixed at the top with the inline price snippet given in theacc screenshot.
fourth is the line after calender is not cloned properly please do it 
1st photo is the current strucutre 
2nd is the targeted

----------------------------

changes:
make the symbols for tags like (cleanliness, accuracy..)
as present in the second image 
2) the comfort accuracy hottub part is seprate by a line

you can see in second image hwo they are alligned 
your task is to make it according to that exactly
do this task without any error and resolve the errors which i have already listed

-----------------------------

Hey AntiGravity, let's fix the Lightbox overlay component. Right now it has a dark background and the layout controls are misplaced. We need it to match the reference Lightbox (Image 1) exactly:

### 1. Overall Background & Container
- Change the modal overlay background from dark/black to **solid white (`bg-white`)**.

### 2. Top Header Bar Layout
- **Top Left**: Add a 9-dot grid icon (Grid/Gallery view icon). Clicking this should close the Lightbox view and take the user back to the full Photo Tour (`?modal=PHOTO_TOUR_SCROLLABLE`).
- **Top Center**: Display the current photo category title (e.g., "Living room 1").
- **Top Right**: 
  - Show the dynamic counter text (e.g., "X of Y" / "4 of 23").
  - Place a simple `X` close icon directly to the right of the counter to exit out of all modals back to the main listing page.

### 3. Center Area & Navigation
- **Center Image**: Center the main photo gracefully in the middle of the viewport with responsive scaling (`max-h-[85vh]`).
- **Navigation Controls**: Position subtle left (`<`) and right (`>`) circular navigation buttons vertically centered on the left and right outer edges of the screen. 
- Enable keyboard arrow keys (`ArrowLeft`, `ArrowRight`) to cycle through photos seamlessly.