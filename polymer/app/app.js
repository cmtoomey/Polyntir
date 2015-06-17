$(document).ready(function() {
    function explorer() {
        var placeholderDiv = document.getElementById("tabmap");
        var url = "https://public.tableau.com/views/GDELT_0/UnclassifiedExplorer?:embed=y&:showTabs=y&:display_count=yes";
        var options = {
            hideTabs: true,
            width: document.getElementById("tabmap").innerWidth,
            height: document.getElementById("tabmap").innerHeight,
            onFirstInteractive: function() {
                // The viz is now ready and can be safely used.
                workbook = viz.getWorkbook();
                var i = 2;

                var timer = $.timer(function() {
                    if (i < 278) {
                        workbook.changeParameterValueAsync("Time", i);
                        i = i + 1;
                    } else {
                        i = 1;
                    }
                });
                timer.set({
                    time: 2000,
                    autostart: true
                });

                $("#tabmap").mouseenter(function() {
                    timer.pause();
                })

                $("#tabmap").mouseleave(function() {
                    timer.play();
                })
                
                $("#explorer").click(function() {
                    workbook.activateSheetAsync("UnclassifiedExplorer");
                    timer.play();
                })

                $("#metrics").click(function() {
                    timer.pause();
                    workbook.activateSheetAsync("ClassifiedMetric");
                })

                $("#themes").click(function() {
                    timer.pause();
                    workbook.activateSheetAsync("ClassifiedThemes");
                })

                $("#profile").click(function() {
                    timer.pause();
                    workbook.activateSheetAsync("ClassifiedProfile");
                })
            }
        };
        var viz = new tableau.Viz(placeholderDiv, url, options);
    };
    explorer();

});