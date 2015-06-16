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

            }
        };
        var viz = new tableau.Viz(placeholderDiv, url, options);
    };
    explorer();
    var i = 2;

    var interval = setInterval(function() {
        if (i < 278) {
            workbook.changeParameterValueAsync("Time", i);
            i = i + 1;
        } else {
            i = 1;
        };
    }, 2000)

    $("#explorer").click(function() {
        workbook.activateSheetAsync("UnclassifiedExplorer");
        var i = 2;

        var interval = setInterval(function() {
            if (i < 278) {
                workbook.changeParameterValueAsync("Time", i);
                i = i + 1;
            } else {
                i = 1;
            };
        }, 2000)

    })

    $("#metrics").click(function() {
        clearInterval(interval);
        workbook.activateSheetAsync("ClassifiedMetric");

    })

    $("#themes").click(function() {
        clearInterval(interval);
        workbook.activateSheetAsync("ClassifiedThemes");
    })

    $("#profile").click(function() {
        clearInterval(interval);
        workbook.activateSheetAsync("ClassifiedProfile");
    })

});