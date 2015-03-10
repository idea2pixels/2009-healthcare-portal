// © 1995-2009 Healthwise, Incorporated. Healthwise, Healthwise for every health decision, 
// and the Healthwise logo are trademarks of Healthwise, Incorporated.
(function($hw, $) {

    $hw.include('control/curvycorners.js');

    // Apply curvy corners to necessary elements
    $hw.ready(function() {

        $('.HwLandingBrowseLinksWrapper').roundedcorners();
        $('.HwLandingBrowseHeader').roundedcorners();
        $('.HwLandingLinksHeader').roundedcorners();

        $('.HwContentHeader').roundedcorners();

        $('.HwActionsetHeader').roundedcorners();
        $('.HwActionsetContent').roundedcorners();
        $('.HwQuiz').roundedcorners();
        $('.HwQuizQuestionsInner').roundedcorners();

        $('.HwConditionCenterClosed').roundedcorners();
        $('.HwConditionCenterClosedAction').roundedcorners();
        $('.HwConditionCenterContentInner').roundedcorners();

        $('.HwListIndexInner').roundedcorners();
        $('.HwListSectionHeader').roundedcorners();
        $('.HwCategoryList').roundedcorners();
    });


    // Wrap curvycorners as a jQuery extension
    $.fn.roundedcorners = function(radius) {
        if (!arguments[0])
            radius = 6;
            
        var settings = {
            tl: { radius: radius },
            tr: { radius: radius },
            bl: { radius: radius },
            br: { radius: radius },
            antiAlias: true,
            autoPad: true,
            validTags: ["div"]
        };

        return this.each(function() {
            var curvy = new curvyObject(settings, this);
            curvy.applyCorners();
        });
    };

})(org.healthwise, jQuery);