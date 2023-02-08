var $q = jQuery.noConflict();
$q(document).ready(function () {
    
    var mode = getParameterByName('mode');
    var ProductFlag = getParameterByName('ProductFlag');
    var Redirectpage = getParameterByName('Redirectpage');
    var S7RenderFix = "&imbypass=true"

    var hdnSKU = $q("#hdnSKU").val();

    //if (mode == "add" && ProductFlag == "true" && Redirectpage == "regular" && hdnSKU != "") {
    //}
    


    var firstEntry = $q("div.entry[name = 'sizingOptions']");
    $q(firstEntry).addClass("active");
    $q(firstEntry).children("div.entryContent:first").css({ "display": "block" });

    $q('div.entry#styleOptions > .entryContent.collars > .subEntry').css({ "display": "block" }).addClass("active");
    $q('div.entry#styleOptions > .entryContent.collars > .subEntry > .subEntry-container').css({ "display": "block" });

    // set short seeleve from select menus//
    $q(".form-select[name='selectSleeveLength']").change(function () {
        var sleeveValue = $q(this).children("option:selected").val();
        var dataSide = "Front"
        //var dataProfile = "Clean"

        if (sleeveValue == "SS") {
            var dataProfile = "_ShortSleeve";

            $q(".hdnCuffStyle").val("Short Sleeve");
            $q(".hdnCuffStyleValue").val("SS");

            $q("div.entry[group='styleOptions']").find(".optionItem.cuff[data-title='Short Sleeve']").addClass("active");
            $q("div.entry[group='styleOptions']").find(".optionItem.cuff[data-title='Short Sleeve']").children("img").addClass("selected");

            $q("div.entry[group='styleOptions']").find(".optionItem.cuff[data-title !='Short Sleeve']").removeClass("active");
            $q("div.entry[group='styleOptions']").find(".optionItem.cuff[data-title !='Short Sleeve']").children("img").removeClass("selected");
            $q("div.entry[group='styleOptions']").find(".subEntry[group = 'cuffs']").addClass("completed");

            $q(".property[data-group = 'cuffOptions'] > span.info").text("Short Sleeve");
            $q(".property[data-group = 'contrastCuff'] > span.info").text("No Contrast");

            fn_BuildShirt(dataSide, dataProfile);
            fn_makeZoomLink();
        }

        if (sleeveValue != "SS") {
            $q("#leftSide").attr("data-profile", "Clean");
            var dataProfile = "Clean";

            //$q("#hdnCuffStyle").val("");
            //$q("#hdnCuffStyleValue").val("");

            //$q("div.entry[group='styleOptions']").find(".optionItem.cuff").removeClass("active");
            //$q("div.entry[group='styleOptions']").find(".optionItem.cuff").children("img").removeClass("selected");

            $q("div.entry[group='styleOptions']").find(".optionItem.cuff[data-title='Short Sleeve']").removeClass("active");
            $q("div.entry[group='styleOptions']").find(".optionItem.cuff[data-title='Short Sleeve'] > img").removeClass("selected");


            fn_BuildShirt(dataSide, dataProfile);
            fn_makeZoomLink();
        }

        //fn_BuildShirt();
        //fn_makeZoomLink();
    });


    function fn_setShortSleeve() {
        //set short sleeve
        var thisValue = $q(".form-select[name=selectSleeveLength]").children("option:selected").val();

        if (thisValue == "SS") {
            $q("div.entry[group='styleOptions']").find(".optionItem[data-title='Short Sleeve']").addClass("active");
            $q("div.entry[group='styleOptions']").find(".optionItem[data-title='Short Sleeve'] > img").addClass("selected");
            $q("div.entry[group = 'styleOptions']")
		  	.find(".addOptionsInner[group='contrastCuff']")
			.parent(".addOptions").css({ "display": "none" });
        }

        if (thisValue != "SS") {
            $q("div.entry[group='styleOptions']").find(".optionItem[data-title='Short Sleeve']").removeClass("active");
            $q("div.entry[group='styleOptions']").find(".optionItem[data-title='Short Sleeve'] > img").removeClass("selected");
            $q("div.entry[group = 'styleOptions']")
		  	.find(".addOptionsInner[group='contrastCuff']")
			.parent(".addOptions").show();
        }
    }


    function fn_entryClick(EntryName, dataGroup) {

        $q('div.entry#styleOptions > .entryContent.collars > .subEntry').css({ "display": "block" }).addClass("active");
        $q('div.entry#styleOptions > .entryContent.collars > .subEntry > .subEntry-container').css({ "display": "block" });

        $q("div.entry[name = '" + EntryName + "']").addClass("active");
        $q("div.entry[name != '" + EntryName + "'][name != 'reviewOrder']").removeClass("active");

        var subLength = $q("div.entry[name = '" + EntryName + "']").children(".entryContent:not('.no-show')").length

        if (subLength <= 1) {
            $q("div.entry[name != '" + EntryName + "'][name  != 'reviewOrder'] > .entryContent").slideUp();
            $q("div.entryContent[name = '" + EntryName + "']").slideDown().addClass("active");
        }


        //
        if (subLength >= 2) {
            $q('div.entry[name = "' + EntryName + '"] > .entryContent:not(".no-show")').css({ "display": "block" });

            if (dataGroup == undefined) {
                $q('div.entry[name = "' + EntryName + '"] > .entryContent:first')
				  	.css({ "display": "block" }).slideDown().addClass("active");

                $q('div.entry[name = "' + EntryName + '"] > .entryContent:first > .subEntry')
				  	.addClass("active").slideDown();

                $q('div.entry[name = "' + EntryName + '"] > .entryContent:first > .subEntry > .subEntry-container')
				  	.addClass("active").slideDown();
            }

            if (dataGroup != undefined) {
                //hide
                $q("div.entry[name = '" + EntryName + "'] > .entryContent[group != '" + dataGroup + "']")
					.children(".subEntry").removeClass("active");

                $q("div.entry[name = '" + EntryName + "'] > .entryContent[group != '" + dataGroup + "'] > .subEntry")
				  .children(".subEntry-container").slideUp();

                //show
                $q("div.entry[name = '" + EntryName + "'] > .entryContent[group = '" + dataGroup + "']")
					.addClass("active");

                $q("div.entry[name = '" + EntryName + "'] > .entryContent[group = '" + dataGroup + "']" > ".subEntry").addClass("active");

                $q("div.entry[name = '" + EntryName + "'] > .entryContent[group = '" + dataGroup + "'] > .subEntry > .subEntry-container")
					.slideDown();
                //
            }
        }

    }

    function fn_continueClick() {
        $q("div.button-continue:not('.sub')").click(function () {
            var EntryName = $q(this).attr("name");
            var Next = $q(this).attr("data-next");

            if ($q(this).parents(".entry").is(".complete")) {

                $q("div.entry[name = '" + EntryName + "']").removeClass("active");
                $q("div.entry[name = '" + Next + "']").slideDown().addClass("active");

                $q("div.entry[name = '" + EntryName + "']").children("div.entryContent[name = '" + EntryName + "']")
					.slideUp()
					.removeClass("active")


                $q("div.entry[name = '" + Next + "']").children("div.entryContent").slideDown().addClass("active");

                if (EntryName == "fabricOptions") {
                    $q('div#divSelectFabric').css({ "display": "block" });
                }

                if (Next == "styleOptions") {

                    // hide pockets if extreme trim fit is selected
                    if ($q("#hdnShirtFit").val() == "Extra Slim Fit") {
                        $q(".entryContent[name = 'pockets']").css({ "display": "none" });
                        $q(".entryContent[name = 'pleats']").css({ "display": "none" });

                        //Pockets
                        $q("#hdnPockets").val("NoPocket");
                        $q("#hdnPocketsValue").val("NP");

                        if ($q("#hdnPockets").val() == "NoPocket") {
                            $q("#hdnMonoGramLocation").children("option[value = '2']").attr("disabled", "disabled");
                        }

                        if ($q("#hdnPockets").val() != "NoPocket") {
                            $q("#hdnMonoGramLocation").children("option[value = '2']").remoevAttr("disabled");
                        }

                        //Pleats
                        $q("#hdnBackPleat").val("NoPleat");
                        $q("#hdnBackPleatValue").val("NP");

                    }
                    if ($q("#hdnShirtFit").val() != "Extra Slim Fit") {
                        $q(".entryContent[name = 'pockets']").css({ "display": "block" });
                        $q(".entryContent[name = 'pleats']").css({ "display": "block" });

                        //Pockets
                        //$q("#hdnPockets").val("");
                        //$q("#hdnPocketsValue").val("");

                        //Pleats
                        //$q("#hdnBackPleat").val("");
                        //$q("#hdnBackPleatValue").val("");
                    }

                    $q('div.entry#styleOptions > .entryContent.collars').slideDown().css({ "display": "block" });
                    $q('div.entry#styleOptions > .entryContent.collars > .subEntry').css({ "display": "block" });
                    $q('div.entry#styleOptions > .entryContent.collars > .subEntry > .subEntry-container').slideDown().css({ "display": "block" });
                }


                fn_scrollTo(Next);
                fn_setShortSleeve()
            }



            //sub-entry
            if ($q("div.entry[name = '" + EntryName + "']").find(".subEntry").length >= 1) {
                $q("div.entry[name = '" + EntryName + "']").children(".subEntry").addClass("active");
                $q("div.entry[name = '" + EntryName + "'] > .subEntry").children(".subEntry-container").slideDown();
            }
            // end sub-entry

            // run error message ONLY if entry NOT completed
            if (EntryName == "sizingOptions") {
                if ($q(this).parents(".entry[name = '" + EntryName + "'].complete").length == 0) {
                    fn_showErrorSelect();
                }
            }

            if (EntryName == "fabricOptions") {
                if ($q(this).parents(".entry[name = '" + EntryName + "'].complete").length == 0) {
                    fn_showErrorSwatch();
                }
            }
            // end run error message ONLY if entry NOT completed

            trackLinkClickForOmniture(this, Next + "ToNextStep", "PFCustomShirtDesign", "");
        });
    }

    //more sub-entries
    function fn_subNextClick() {

        $q("body").on("click", ".button-continue.sub", function () {
            Group = $q(this).attr("name");
            SubNext = $q(this).attr("data-next");
            Next = $q(this).attr("data-next");

            //validate
            if ($q(this).parents(".subEntry").is(".completed")) {
                //hide current
                $q(".entryContent[group = '" + Group + "']").children(".subEntry").removeClass("active");
                $q(".entryContent[group = '" + Group + "'] > .subEntry").children(".subEntry-container").slideUp();

                //show next
                $q(".entryContent[group = '" + SubNext + "']").addClass("active");
                $q(".entryContent[group = '" + SubNext + "']").children(".subEntry").addClass("active");
                $q(".entryContent[group = '" + SubNext + "'] > .subEntry").children(".subEntry-container").slideDown();
            }


            if (SubNext == "reviewOrder") {
                if ($q(this).parents(".entry").is(".complete")) {
                    fn_scrollTo(Next);
                    $q(".entry[group = 'reviewOrder']").addClass("active");
                    $q(".entryContent[name = 'reviewOrder']").addClass("active").slideDown();
                }
            }

            fn_showErrorOption(Group);
            fn_setShortSleeve()

            trackLinkClickForOmniture(this, SubNext + "ContinueToNextStep", "PFCustomShirtDesign", "");
        });
    }

    function fn_subPreviousClick() {
        $q(".button-previous.sub").click(function () {
            Group = $q(this).attr("name");
            SubPrevious = $q(this).attr("data-previous");

            //hide current
            $q(".entryContent[group = '" + Group + "']").children(".subEntry").removeClass("active");
            $q(".entryContent[group = '" + Group + "'] > .subEntry").children(".subEntry-container").slideUp();

            //show previous
            $q(".entryContent[group = '" + SubPrevious + "']").addClass("active");
            $q(".entryContent[group = '" + SubPrevious + "']").children(".subEntry").addClass("active");
            $q(".entryContent[group = '" + SubPrevious + "'] > .subEntry").children(".subEntry-container").slideDown();


            if ($q(this).is(".index")) {
                $q(".entry[group = '" + SubPrevious + "']").slideDown().addClass("active");
                $q(".entryContent[group = '" + SubPrevious + "']").slideDown().addClass("active");
                $q(".entryContent[group = '" + Group + "'] > .subEntry").children(".subEntry-container").slideUp();
                $q(".previous.sub.index").parents(".entry").removeClass("active");
            }

        });
        fn_setShortSleeve()
    }

    function fn_previousClick() {
        $q(".button-previous:not('.sub')").click(function () {
            Group = $q(this).attr("name");
            SubPrevious = $q(this).attr("data-previous");

            //hide current
            $q(".entry[name = '" + Group + "']").children(".subEntry").removeClass("active");
            $q(".entry[name = '" + Group + "'] > .entryContent").children(".subEntry-container").slideUp();

            //show previous
            $q(".entry[name = '" + SubPrevious + "']").addClass("active");
            $q(".entry[name = '" + SubPrevious + "']").children(".subEntry").addClass("active");
            $q(".entry[name = '" + SubPrevious + "'] > .entryContent").slideDown();
            $q(".entry[name = '" + SubPrevious + "'] > .entryContent").children(".subEntry-container").slideDown();
        });
        fn_setShortSleeve()
    }
    // end more sub-entries

    function fn_subEntryClick() {
        $q(".subEntryTitle").click(function () {
            var thisName = $q(this).attr("name");
            $q(".subEntry.completed[name = '" + thisName + "']").children(".subEntry-container").slideDown();
            $q(".subEntry[name != '" + thisName + "']").children(".subEntry-container").slideUp();
            $q(".subEntryTitle").not(this).parents(".subEntry").removeClass("active");
        });
    }




    function fn_showErrorSelect() {
        var alertMsg = "";
        if ($q(".form-select[name = 'selectCollarSize']").val() == " ") {
            alertMsg += $q(".form-select[name = 'selectCollarSize']").attr("data-message") + "\n";
        }
        if ($q(".form-select[name = 'selectSleeveLength']").val() == " ") {
            alertMsg += $q(".form-select[name = 'selectSleeveLength']").attr("data-message") + "\n";
        }
        if ($q(".form-select[name = 'selectFit']").val() == " ") {
            alertMsg += $q(".form-select[name = 'selectFit']").attr("data-message") + "\n";
        }

        if ($q(".form-select[name = 'selectBodyLength']").val() == " ") {
            alertMsg += $q(".form-select[name = 'selectBodyLength']").attr("data-message") + "\n";
        }
        alert(alertMsg);
    }

    function fn_showErrorSwatch() {
        var alertMsg = "";
        if ($q(".optionItem.swatch > img:not('.selected')")) {
            alert("Please select a fabric");
        }
    }

    function fn_showErrorOption(Group) {
        var alertMsg = "";

        //collars
        if (Group == "collars") {
            if ($q(".subEntry[group = 'collarOptions'].completed").length < 1) {
                if ($q(".optionItem.collar > img.selected").length < 1) {
                    alertMsg += "Please select a collar style\n";
                }

                if ($q(".optionItem.collar > img.selected").val() == "BN2") {
                    alertMsg += "Band collar available only in edge stitch\n";
                }

                if ($q(".addOptionsInner[group = 'contrastCollar']").find("img.selected").length < 1) {
                    alertMsg += "Please select a contrast collar color\n";
                }

                if ($q(".addOptionsInner[group = 'collarStitch']").find("img.selected").length < 1) {
                    alertMsg += "Please select a collar stitch\n";
                }

                alert(alertMsg);
            }
        }
        // end collars

        // cuffs
        if (Group == "cuffs") {
            var selectedCuff = $q(".optionItem.cuff > img.selected").attr("value");
            if ($q(".subEntry[name = 'cuffOptions'].completed").length < 1) {

                if ($q(".optionItem.cuff > img.selected").length < 1) {
                    alertMsg += "Please select a cuff style\n";

                    alert(alertMsg);
                }

                if (selectedCuff != "SS" && selectedCuff != " ") {
                    if ($q(".addOptionsInner[group = 'contrastCuff']").find("img.selected").length < 1) {
                        alertMsg += "Please select a contrast cuff color\n";
                    }
                    alert(alertMsg);
                }
            }
        }
        // end cuffs

        //pockets
        if (Group == "pockets") {
            if ($q(".entryContent:not('.no-show') > .subEntry[name = 'pocketOptions'].completed").length < 1) {
                if ($q(this).find(".optionItem.pocket > img.selected").length < 1) {
                    alertMsg += "Please select a pocket style\n";
                }
                alert(alertMsg);
            }
        }
        //end pockets

        //pleats
        if (Group == "pleats") {
            if ($q(".entryContent:not('.no-show') > .subEntry[name = 'pleatOptions'].completed").length < 1) {
                if ($q(".optionItem.pleat > img.selected").length < 1) {
                    alertMsg += "Please select a pleat style\n";
                }
                alert(alertMsg);
            }
        }
        //end pleats

        //pleats
        if (Group == "plackets") {
            if ($q(".subEntry[name = 'placketOptions'].completed").length < 1) {
                if ($q(".optionItem.placket > img.selected").length < 1) {
                    alertMsg += "Please select a placket style\n";
                }
                alert(alertMsg);
            }
        }
        //end pleats

        //monogram
        if (Group == "monogram") {
            var dataMonogram = $q("#leftSide").attr("data-monogram");
            var dataMonogramStyleChosen = $q("#leftSide").attr("data-monogram-style-chosen");
            var dataMonogramStyle = $q("#leftSide").attr("data-monogram-style");
            var dataMonogramLocation = $q("#leftSide").attr("data-monogram-location");
            var dataMonogramLocationChosen = $q("#leftSide").attr("data-monogram-location-chosen");
            var dataMonogramColor = $q("#leftSide").attr("data-monogram-color");
            var dataMonogramColorChosen = $q("#leftSide").attr("data-monogram-color-chosen");
            var dataMonogramInitials = $q("#leftSide").attr("data-monogram-single-initials");


            if ($q(".subEntry[name = 'monogramOptions'].completed").length < 1) {
                if (dataMonogram == "yes") {

                    if (dataMonogramStyleChosen != "yes" ||  dataMonogramStyle == "0") {
                        alertMsg += "Please choose a monogram style\n";
                    }

                    if ( $q(dataMonogramStyle) == "") {
                        alertMsg += "Please choose a monogram style\n";
                    }

                    if (dataMonogramLocationChosen != "yes" || dataMonogramLocation == "0") {
                        alertMsg += "Please choose a monogram location\n";
                    }

                    if (dataMonogramColorChosen != "yes" || dataMonogramColor == "0") {
                        alertMsg += "Please choose a monogram color\n";
                    }

                    if (dataMonogramColor == "") {
                        alertMsg += "Please choose a monogram color\n";
                    }

                    if (dataMonogramInitials == "" || !dataMonogramInitials ) {
                        alertMsg += "Please enter monogram initials\n";
                    }

                    $q(".monogram-initials")
                    if ($q(".monogram-initials").val().length < 3) {
                        alertMsg += "Please enter at least 3 monogram initials\n";
                    }
                    
                    alert(alertMsg);
                }
            }
        }
        //end monogram

    }


    var template;
    var monogramInitialLayers;

    function fn_BuildShirt(dataSide, dataProfile) {
        var dataSide = $q("#leftSide").attr("data-side");

        if (dataSide == null) {
            var dataSide = "Front";
        }
        if (dataProfile == undefined) {
            var dataProfile = $q("#leftSide").attr("data-profile");
        }
        if (dataSide == dataProfile) {
            var buildProfile = $q("#leftSide").attr("data-profile") + "?";
        }
        if (dataSide == "Back" && dataProfile == "Clean") {
            var buildProfile = "Back?";
        }
        if (dataSide == "Back" && dataProfile == "_ShortSleeve") {
            var buildProfile = "Back_ShortSleeve?";
        }
        if (dataSide == "Front" && dataProfile == "_ShortSleeve") {
            var buildProfile = "Front_ShortSleeve?";
        }
        if (dataSide == "Back" && dataProfile == "CleanXC2") {
            var buildProfile = "Back?";
        }
        if (dataSide == "Front" && dataProfile == "Clean") {
            var buildProfile = "FrontClean?";
        }
        if (dataSide == "Front" && dataProfile == "CleanXC2") {
            var buildProfile = "FrontCleanXC2?";
        }
        var hotCollar = $q("#leftSide").attr("data-collar");
        if (dataSide == "Front" && hotCollar == "EC") {
            var buildProfile = "FrontCleanXC2?";
        }
        if (hotCollar == "EC" && dataSide == "_ShortSleeve") {
            var buildProfile = "Front_ShortSleeve?";
        }
        if (dataSide == "Front" && hotCollar == "JS") {
            var buildProfile = "FrontClean_Jermyn?";
        }
        var hotCuff = $q("#leftSide").attr("data-cuff");
        var WID = "wid=420&";

        //fabric
        var swatchSrc = $q(".swatch > img.selected").attr("value");
        if (swatchSrc == null) {
            swatchSrc = "customswatch_MAR0204_010";
        }
        swatchSrc = "&src=" + swatchSrc;

        //contrast fabrics
        whiteContrast = "&src=customswatch_MAR0204_010&repeat=14&show";
        blackContrast = "&src=customswatch_MAR0205_001&repeat=14&rs=I0J5Q2&show";
        // end contrastFabrics

        // end fabric

        //stitch
        var buildStitch = $q(".collarStitch > img.selected").attr("value");
        if (buildStitch == null) {
            buildStitch = "2";
        }
        // end stitch

        //collars/
        var collar = $q(".collar > img.selected").attr("value");
        if (collar == null) {
            collar = "WS";
        }

        //extreme spread collar
        if (collar == "EC") {
            var dataProfile = "CleanXC2";
            buildStitch = "2";
        }
        // end extreme spread collar



        var contrastCollar = $q(".contrastCollar > img.selected").attr("value");
        if (contrastCollar == null || contrastCollar == "none") {
            var collarColor = swatchSrc;
        }


        if (contrastCollar == "white") {
            var collarColor = whiteContrast;

            if (dataSide == "Back") {
                buildCollarButton = "";
            }
            else {
                buildCollarButton = "&obj=collars/" + collar + buildStitch + "/"
					+ collar + buildStitch + "-button-ivory/" + collar + buildStitch +
								"-button-ivory&show";
            }
        }

        if (contrastCollar == "black") {
            var collarColor = blackContrast;
            if (dataSide == "Back") {
                buildCollarButton = "";
            }
            else {
                buildCollarButton = "&obj=collars/" + collar + buildStitch + "/"
					+ collar + buildStitch + "-button-ivory/" + collar + buildStitch +
								"-button-ivory&hide";
            }
        }
        else {
            if (dataSide == "Back") {
                buildCollarButton = "";
            }
            else {
                buildCollarButton = "&obj=collars/" + collar + buildStitch + "/"
					+ collar + buildStitch + "-button-ivory/" + collar + buildStitch +
								"-button-ivory&show";
            }
        }

        //band collar
        if (collar == "BN2") {
            if (dataSide == "Back") {
                buildCollar = "&obj=collars/BNb&show&" + collarColor;
            }
            else {
                buildCollar = "&obj=collars/" + collar + "&show&" + collarColor;
            }
        }
            // end band collar

        else {
            if (dataSide == "Back") {
                buildCollar = "&obj=collars/BD" + buildStitch + "b&show&" + collarColor;
            }
            else {
                buildCollar = "&obj=collars/" + collar + buildStitch + "&show&" + collarColor + buildCollarButton;
            }
        }




        // end collars

        //plackets
        var placket = $q(".placket > img.selected").attr("value");

        //if(dataSide != "Back"){
        if (placket == null) {
            placket = "T1";
        }
        if (placket != null || placket == "T1") {
            buildPlacket = "&obj=plackets/" + placket + "&show&" + swatchSrc +
								"&obj=plackets/" + placket + "/" + placket + "-button/" + placket + "-button-ivory&show";
        }

        if (placket == "C1") {
            buildPlacket = "&obj=plackets/" + placket + "&show&" + swatchSrc;
        }
        //}

        if (dataSide == "Back") {
            buildPlacket = "";
        }
        // end plackets


        //cuffs
        var cuff = $q(".cuff > img.selected").attr("value");

        if (cuff == null) {
            cuff = "B"
        }

        //contrasting cuffs
        var contrastCuff = $q(".contrastCuff > img.selected").attr("value");
        if (contrastCuff == null) {
            contrastCuff = "none";
            cuffColor = swatchSrc + "&show";
        }

        if (contrastCuff == "none") {
            cuffColor = swatchSrc + "&show";
        }

        if (contrastCuff == "white") {
            cuffColor = whiteContrast;
        }

        if (contrastCuff == "black") {
            cuffColor = blackContrast;
        }
        // end contrasting cuffs

        //short sleeve//
        if (cuff == "SS") {

            // hide contrasting cuff
            $q(".entryContent[group = 'cuffs']").find(".subEntry-container").children(".addOptions").slideUp();

            //hide cuff option in monogram location
            $q("#PFStandardLayout_MainContent_ddLocation").children("option[value = '1']").hide();


            $q("#leftSide").attr("data-profile", "_ShortSleeve");

            if (dataSide == "Back") {
                buildProfile = "Back_ShortSleeve?&obj=SSLV&show&"
            }
            else {
                buildProfile = "Front_ShortSleeve?&obj=SSLV&show&"
            }
            buildSleeve = "";
            buildCuff = "";
            buildSleeveButton = "";
            buildCuffButton = "";

            $q(".entryContent[name = 'cuffs']").attr("data-complete", "1");
        }

        // end short sleeve

        // not short sleeve//
        if (cuff != "SS") {

            $q(".entryContent[name = 'cuffs']").attr("data-complete", "2");

            // show contrasting cuff
            $q(".entryContent[group = 'cuffs']").find(".subEntry-container").children(".addOptions").slideDown();

            //show cuff option in monogram location
            $q("#PFStandardLayout_MainContent_ddLocation").children("option[value = '1']").show();

            $q("#leftSide").attr("data-profile", "Clean");

            if (dataSide == "Back") {
                buildSleeve = "&obj=sleeves/Z" + cuff + buildStitch + "b/Z" + cuff + buildStitch + "b-sleeves&show&" + swatchSrc;
                buildCuff = "&obj=sleeves/Z" + cuff + buildStitch + "b/Z" + cuff + buildStitch + "b-cuffs&" + cuffColor;
                buildSleeveButton = "&obj=sleeves/Z" + cuff + buildStitch + "b/Z" + cuff + buildStitch + "b-button-ivory/Z" +
		  						cuff + buildStitch + "b-sleeve-button-ivory&show";
            }

            if (dataSide != "Back") {
                buildSleeve = "&obj=sleeves/Z" + cuff + buildStitch + "/Z" + cuff + buildStitch + "-sleeves&show&" + swatchSrc;
                buildCuff = "&obj=sleeves/Z" + cuff + buildStitch + "/Z" + cuff + buildStitch + "-cuffs&" + cuffColor;
                buildSleeveButton = "&obj=sleeves/Z" + cuff + buildStitch + "/Z" + cuff + buildStitch + "-button-ivory/Z" +
		  						cuff + buildStitch + "-sleeve-button-ivory&show";
            }

            //BUILD CUFF BUTTON
            //IF FRENCH CUFF OR MITERED FRENCH CUFF
            if (cuff == "F" || cuff == "FM") {
                buildCuffButton = "";
            }
                //IF FRENCH CUFF OR MITERED FRENCH CUFF

            else {

                //contrast cuff buttons
                if (contrastCuff == "none") {
                    if (dataSide == "Back") {
                        buildCuffButton = "&obj=sleeves/Z" + cuff + buildStitch + "b/Z" + cuff + buildStitch + "b-button-ivory/Z" + cuff + buildStitch +
			  "b-cuff-button-ivory&show" + "&obj=sleeves/Z" + cuff + buildStitch + "b/Z" + cuff + buildStitch + "b-cuffs/Z" + cuff + buildStitch +
			  "b-cuff-button&hide";
                    }

                    if (dataSide != "Back") {
                        buildCuffButton = "&obj=sleeves/Z" + cuff + buildStitch + "/Z" + cuff + buildStitch + "-button-ivory/Z" + cuff + buildStitch +
			  "-cuff-button-ivory&show" + "&obj=sleeves/Z" + cuff + buildStitch + "/Z" + cuff + buildStitch + "-cuffs/Z" + cuff + buildStitch +
			  "-cuff-button&hide";
                    }
                }

                if (contrastCuff == "white") {
                    if (dataSide == "Back") {
                        buildCuffButton = "&obj=sleeves/Z" + cuff + buildStitch + "b/Z" + cuff + buildStitch + "b-button-ivory/Z" + cuff + buildStitch +
			  "b-cuff-button-ivory&show" + "&obj=sleeves/Z" + cuff + buildStitch + "b/Z" + cuff + buildStitch + "b-cuffs/Z" + cuff + buildStitch +
			  "b-cuff-button&hide";
                    }

                    if (dataSide != "Back") {
                        buildCuffButton = "&obj=sleeves/Z" + cuff + buildStitch + "/Z" + cuff + buildStitch + "-button-ivory/Z" + cuff + buildStitch +
			  "-cuff-button-ivory&show" + "&obj=sleeves/Z" + cuff + buildStitch + "/Z" + cuff + buildStitch + "-cuffs/Z" + cuff + buildStitch +
			  "-cuff-button&hide";
                    }
                }

                if (contrastCuff == "black") {
                    if (dataSide == "Back") {
                        buildCuffButton = "&obj=sleeves/Z" + cuff + buildStitch + "b/Z" + cuff + buildStitch + "b-button-ivory/Z" + cuff + buildStitch +
			  "b-cuff-button-ivory&hide" + "&obj=sleeves/Z" + cuff + buildStitch + "b/Z" + cuff + buildStitch + "b-cuffs/Z" + cuff + buildStitch +
			  "b-cuff-button&show";
                    }
                    if (dataSide != "Back") {
                        buildCuffButton = "&obj=sleeves/Z" + cuff + buildStitch + "/Z" + cuff + buildStitch + "-button-ivory/Z" + cuff + buildStitch +
			  "-cuff-button-ivory&hide" + "&obj=sleeves/Z" + cuff + buildStitch + "/Z" + cuff + buildStitch + "-cuffs/Z" + cuff + buildStitch +
			  "-cuff-button&show";
                    }
                }
                //end contrast cuff buttons

            }
            // END BUILD CUFF BUTTON

        }
        // end not short sleeve
        // end cuffs



        //pockets
        if ($q(".hdnShirtFit").val() == "Extra Trim Fit") {
            var pocket = $q(".pocket > img[title = 'No Pocket']").addClass("selected");
        }
        else {
            var pocket = $q(".pocket > img.selected").attr("value");
        }

        //no pockets for back views
        if (dataSide == "Back") {
            buildPocket = "";
        }

        //end no pockets for back views

        if (dataSide != "Back") {
            if (pocket == null || pocket == "S") {
                pocket = "S";

                //miter the pocket if mitered cuff
                if (cuff == "M") {
                    buildPocket = "&obj=pockets/" + pocket + "/XM&show&" + swatchSrc;
                }
                if (cuff == "FM") {
                    buildPocket = "&obj=pockets/" + pocket + "/XM&show&" + swatchSrc;
                }
                //end miter the pocket if mitered cuff

                if (cuff != "M" && cuff != "FM") {
                    buildPocket = "&obj=pockets/" + pocket + "/XR&show&" + swatchSrc;
                }
            }

            if (pocket == "D") {
                //miter the pocket if mitered cuff
                if (cuff == "M") {
                    buildPocket = "&obj=pockets/D/XM2&show&" + swatchSrc;
                }
                if (cuff == "FM") {
                    buildPocket = "&obj=pockets/D/XM2&show&" + swatchSrc;
                }
                //end miter the pocket if mitered cuff
                if (cuff != "M" && cuff != "FM") {
                    buildPocket = "&obj=pockets/D/XR2&show&" + swatchSrc;
                }
            }

            if (pocket == "N") {
                buildPocket = "&obj=pockets/D/XM2&hide&" + swatchSrc;
                //hide pocket option in monogram location
                $q("#PFStandardLayout_MainContent_ddLocation").children("option[value = '2']").hide();
            }


            if ($q(".hdnShirtFit").val() == "Extra Trim Fit") {
                buildPocket = "&obj=pockets/D/XM2&hide&" + swatchSrc;
                //hide pocket option in monogram location
                $q("#PFStandardLayout_MainContent_ddLocation").children("option[value = '2']").hide();
            }

            if (pocket != "N") {
                //hide pocket option in monogram location
                $q("#PFStandardLayout_MainContent_ddLocation").children("option[value = '2']").show();
            }
        }


        // end pockets

        //pleats
        var pleats = $q(".pleat > img.selected").attr("value");

        if (pleats == null && $q(".sizingSelect[name = 'selectFit']").children("option:selected").val() != "Extra Slim Fit"  ) {
            //console.log($q(".sizingSelect[name = 'selectFit']").children("option:selected").val() )
            $q("#hdnBackPleat").val("Box Pleat");
            $q("#hdnBackPleatValue").val("BoxPleat");
        }

        if (dataSide == "Back") {
            if (pleats == null) {
                if (cuff == "SS") {
                    pleats = "BoxPleat";
                    buildProfile = "Back_ShortSleeve?&obj=shortsleeve_" + pleats + "&show&"
                }
                if (cuff != "SS") {
                    pleats = "BoxPleat";
                    WID = WID + "obj=Hero" + pleats + "&show&";
                }
            }

            if (pleats != null) {
                if (cuff == "SS") {
                    buildProfile = "Back_ShortSleeve?&obj=shortsleeve_" + pleats + "&show&"
                }
                if (cuff != "SS") {
                    WID = WID + "obj=Hero" + pleats + "&show&";
                }
            }

            if ( $q(".sizingSelect[name = 'selectFit']").children("option:selected").val() == "Extra Slim Fit") {
                $q("#hdnBackPleat").val("No Pleat");
                $q("#hdnBackPleatValue").val("NoPleat");
            }

        }
        // end pleats

        //monogramming

        var dataMonogram = $q("#leftSide").attr("data-monogram");
        var monogramLocationValue = $q("#leftSide").attr("data-monogram-location");
        var monogramStyleValue = $q("#leftSide").attr("data-monogram-template");
        var dataMonogramInitials = $q("#leftSide").attr("data-monogram-initials");

        if (monogramStyleValue == "b") { var template = "block"; }

        if (monogramStyleValue == "s") { var template = "script"; }

        if (monogramStyleValue == "d") { var template = "diamond"; }

        //if(monogramLocationValue == null){
        var monogramImage = "";
        //}
        //monogram location
        //location:cuff

        if (dataMonogram == "yes") {
            if (monogramLocationValue == 1) {
                monogramImage = "&obj=sleeves/Z" + cuff + buildStitch + "/Z" + cuff + buildStitch + "-monogram/Z" + cuff + buildStitch +
							"-monogram&decal&pos=15,6&anchor=0,0" + "&rotate=90&res=10&src=is{PaulFredrick/monogramTemplate-" +
							template + "?&" + dataMonogramInitials + "}&show";
            }
            // end location cuff

            //location:pocket
            if (monogramLocationValue == 2) {
                monogramImage = "&obj=pocket-monogram/MNGRM&decal&pos=77,-62&anchor=0,0" +
											  "&res=10&src=is{PaulFredrick/monogramTemplate-"
											  + template + "?&" + dataMonogramInitials + "}&show";
            }
        }


        // end location pocket
        // end monogram location

        if (cuff == "SS" && monogramLocationValue == 1) {
            var monogramImageBuild = "";
        }
        else {
            var monogramImageBuild = monogramImage;
        }

        if (dataMonogram == "no") {
            monogramImageBuild = "";
        }

        //if pocket
        if (monogramLocationValue == 1) {
            //if cuff style is mitered, french or french mitered, no monogram
            if (cuff == "M" || cuff == "F" || cuff == "FM") {
                monogramImageBuild = "";
            }
        }
        // end monogramming


        var mainImagePath = S7RenderPath + buildProfile + WID + swatchSrc + buildCollar + buildSleeve + buildCuff + buildSleeveButton
							+ buildCuffButton + buildPlacket + buildPocket + monogramImageBuild+S7RenderFix;


        //populate main image
        $q("#largeImage").attr("src", mainImagePath);


        //set profile in hidden form
        $q("#hdnProfile").val(buildProfile);

        //set main image url in hidden form
        $q("#imgURL").val(mainImagePath);

        fn_mainValidate();
    }


    function fn_swatchClick() {
        $q("#divSelectFabric").on("click", "div.optionItem[name='swatch']", function () {

            //variables
            swatchMarker = $q(this).attr("prodid");
            var dataGroup = $q(this).attr("name");

            //get swatch title
            var swatchTitle = $q(this).children("img").attr("group");

            if ($q(this).children("img").attr("saleprice")) {
                hdnListPrice = $q(this).attr("saleprice")
            }
            else {
                hdnListPrice = $q(this).children("img").attr("price");
            }

            $q("#leftSide").attr("data-price", hdnListPrice)

            $q("#hdnListPrice").val(hdnListPrice)

            hdnVariantId = $q(this).children("img").attr("variantid");
            hdnProductColor = $q(this).children("img").attr("color");
            hdnImagePath = $q(this).children("img").attr("originalimagepath");
            hdnSKU = $q(this).children("img").attr("prodid");
            swatchSrc = $q(this).children("img").attr("value");
            // end variables

            $q("div.optionItem[name='swatch'][prodid = '" + swatchMarker + "']").addClass("active");
            $q("div.optionItem[name='swatch'][prodid != '" + swatchMarker + "']").removeClass("active");

            $q("div.optionItem[name='swatch'][prodid = '" + swatchMarker + "']").children("img").addClass("selected");
            $q("div.optionItem[name='swatch'][prodid != '" + swatchMarker + "']").children("img").removeClass("selected");


            //set hidden form //
            $q("#hdnListPrice").val(hdnListPrice);
            $q("#hdnVariantId").val(hdnVariantId);
            $q("#hdnProductColor").val(hdnProductColor);
            $q("#hdnImagePath").val(hdnImagePath);
            $q("#hdnSKU").val(hdnSKU);
            // end set hidden form //


            // set price in review 
            $q(".adjustedPrice > span").text(parseFloat(hdnListPrice).toFixed(2));

            // set price on right 
            $q(".subPrice > span").text(parseFloat(hdnListPrice).toFixed(2))

            //swatch validation
            dataComplete = $q(".entryContent[name = 'fabricOptions']").attr("data-complete");
            if ($q(".optionItem.swatch > img.selected").length = dataComplete) {
                $q(".entry[name = 'fabricOptions']").addClass("complete")
            }
            if ($q(".optionItem.swatch > img.selected").length < dataComplete) {
                $q(".entry[name = 'fabricOptions']").removeClass("complete")
            }
            // end swatch validation

            //set values in summary
            $q(".property[data-group = '" + dataGroup + "'] > span.info").text(swatchTitle);


            //buildShirt
            fn_BuildShirt();
            fn_makeZoomLink();
            fn_updateCost();

        });
    }

    function fn_optionItemClick() {
        $q(".optionItem.pocket > img").attr("data-side", "Front");
        $q(".optionItem.pleat > img").attr("data-side", "Back");
        $q(".optionItem.placket > img").attr("data-side", "Front");

        //$q("#divSelectFabric").on( "click", "div.optionItem[name='swatch']", function() {

        $q("body").on('click', ".optionItem[name !='swatch']:not('.fit')", function () {
            var getDataProfile = $q("#leftSide").attr("data-profile")
            var dataName = $q(this).attr("name");
            var dataTitle = $q(this).attr("data-title");
            var dataMarker = $q(this).attr("data-marker");
            var dataFormStyle = $q(this).children("img").attr("data-form-style");
            var dataFormStyleValue = $q(this).children("img").attr("data-form-style-value");
            var dataMonogram = $q("#leftSide").attr("data-monogram");


            $q(".optionItem[name = '" + dataName + "'][data-title = '" + dataTitle + "'][data-marker = '" + dataMarker + "']").addClass("active");
            $q(".optionItem[name = '" + dataName + "'][data-title = '" + dataTitle + "'][data-marker = '" + dataMarker + "']").children("img").addClass("selected");

            $q(".optionItem[name = '" + dataName + "'][data-title != '" + dataTitle + "'][data-marker != '" + dataMarker + "']").removeClass("active");
            $q(".optionItem[name = '" + dataName + "'][data-title != '" + dataTitle + "'][data-marker != '" + dataMarker + "']").children("img").removeClass("selected");

            var thisClass = ($q(this).attr('class').split(' ')[1]);

            //get the value
            var thisValue = $q(this).attr("data-marker");

            //get text of selected and trim whitespace
            var thisText = $q(this).text().trim();

            //get name of item for summary
            var dataGroup = $q(this).children("img").attr("name");

            $q("#leftSide").attr("data-" + thisClass, thisValue)

            var dataSide = $q(this).children("img").attr("data-side");

            if (dataSide == null) {
                var dataSide = $q("#leftSide").attr("data-side");
            }

            if (thisClass == "cuff") {
                //if( $q(".form-select[name='selectSleeveLength']").children("option.selected").val() != "SS"){
                if ($q(".optionItem.cuff").children("img.selected").attr("value") == "SS") {
                    $q("#leftSide").attr("data-profile", "_ShortSleeve");
                    $q(".form-select[name='selectSleeveLength']").children("option[value='SS']")
							.addClass("selected").attr("selected", "selected");

                    $q(".form-select[name='selectSleeveLength']").children("option[value!='SS']")
							.removeClass("selected").prop("selected", false);
                }
                //}

                if ($q(".form-select[name='selectSleeveLength']").children("option.selected").val() == "SS") {
                    if ($q(".optionItem.cuff").children("img.selected").attr("value") != "SS") {

                        $q("#leftSide").attr("data-profile", "Clean");
                        $q(".form-select[name='selectSleeveLength']").children("option[value='SS']")
							.removeClass("selected").prop("selected", false);

                        $q(".entry[group = 'sizingOptions']").removeClass("complete");
                        $q(".entry[group = 'sizingOptions']").children(".entryContent").slideDown();

                        fn_showErrorSelect();
                    }
                }
            }

            var dataProfile = $q(this).children("img").attr("data-profile");

            if (dataProfile == "EC") {
                var dataProfile = "CleanXC2";
            }

            if (dataProfile == "SS") {
                var dataProfile = "_ShortSleeve"
                $q(".form-select[name='selectSleeveLength'] option[value = 'SS']").addClass("selected");
                $q(".form-select[name='selectSleeveLength'] option[value != 'SS']").removeClass("selected");
            }

            if (dataSide == "Back") {
                var setDataSide = "Back";
                $q("#leftSide").attr("data-side", setDataSide);
                $q(".view[value = '" + dataSide + "']").addClass("active");
                $q(".view[value != '" + dataSide + "']").removeClass("active");
            }

            if (dataSide == "Front") {
                var setDataSide = "Front";
                $q("#leftSide").attr("data-side", setDataSide);
                $q(".view[value = '" + dataSide + "']").addClass("active");
                $q(".view[value != '" + dataSide + "']").removeClass("active");
            }
            //else{
            $q("#leftSide").attr("data-profile", dataProfile);
            //}

            //set values in summary
            $q(".property[data-group = '" + dataGroup + "'] > span.info").text(thisText);


            //set values of hidden form elements
            $q("#" + dataFormStyle).val(thisText);
            $q("#" + dataFormStyleValue).val(thisValue);


            fn_BuildShirt(dataProfile);
            fn_makeZoomLink();

            //validation
            var dataComplete = $q(this).parents(".entryContent").not(".no-show").attr("data-complete");
            var selectedItems = $q(this).parents(".entryContent").not(".no-show").find("img.selected").length;

            var tally = parseInt(dataComplete - selectedItems);
            if (tally < 1) {
                $q(this).parents(".subEntry").addClass("completed");
                $q(this).parents(".entry").addClass("complete");
            }
            if (tally > 0) {
                $q(this).parents(".subEntry").removeClass("completed");
            }
            // end validation


            fn_mainValidate();
        });


    }


    function fn_mainValidate() {
        $q(".entry[name = 'styleOptions']").each(function () {

            var dataMonogram = $q("#leftSide").attr("data-monogram");
            var entryComplete = $q(this).attr("data-complete");
            var entryContent = $q(this).children(".entryContent").not(".no-show");
            var subEntryComplete = $q(entryContent).children(".subEntry.completed").length;

            if (dataMonogram == "no" && subEntryComplete == parseInt(entryComplete)) {
                $q(".entry[name = 'styleOptions']").addClass("complete");
            }

            if (dataMonogram == "no" && subEntryComplete < parseInt(entryComplete)) {
                $q(".entry[name = 'styleOptions']").removeClass("complete").removeClass("active");
            }

            /*if( dataMonogram == "no" && subEntryComplete == parseInt(entryComplete) ){
			$q(".entry[name = 'styleOptions']").addClass("complete");
			}*/

            //monogramming section validation

            var dataMonogramStyleChosen = $q("#leftSide").attr("data-monogram-style-chosen");
            var dataMonogramStyle = $q("#leftSide").attr("data-monogram-style");
            var dataMonogramLocation = $q("#leftSide").attr("data-monogram-location");
            var dataMonogramLocationChosen = $q("#leftSide").attr("data-monogram-location-chosen");
            var dataMonogramColorChosen = $q("#leftSide").attr("data-monogram-color-chosen");
            var dataMonogramSingleInitials = $q("#leftSide").attr("data-monogram-single-initials");



            if (dataMonogram == "no") {
                $q(".subEntry[name = 'monogramOptions']").addClass("completed");
            }

            if (dataMonogram == "yes") {
                $q(".entry[name = 'styleOptions']").removeClass("complete");

                if (dataMonogramStyleChosen == "yes" && dataMonogramLocationChosen == "yes"
					&& dataMonogramColorChosen == "yes" && dataMonogramSingleInitials.length >= 3) {
                    $q(".subEntry[name = 'monogramOptions']").addClass("completed");
                    $q(".entry[name = 'styleOptions']").addClass("complete");
                }

                if (dataMonogramStyleChosen != "yes" || dataMonogramLocationChosen != "yes" || dataMonogramColorChosen != "yes" || dataMonogramSingleInitials.length < 3) {
                    $q(".subEntry[name = 'monogramOptions']").removeClass("completed");
                }
            }
            // end monogramming section validation
        });
    }
    // end fn_mainValidate


    function fn_setAttr() {
        $q("body").on("click", ".optionItem[name !='swatch'] > img", function () {
            var thisValue = $q(this).attr("value");

            var dataProfile = $q("#leftSide").attr("data-profile");
            if (thisValue == null || thisValue == "") {
                var dataProfile = $q("#leftSide").attr("data-profile");
            }

            if (thisValue == "EC") {
                var dataProfile = "CleanXC2";
            }
            if (thisValue == "SS") {
                var dataProfile = "_ShortSleeve";
            }

            $q("#leftSide").attr("data-profile", dataProfile);

        });
    }

    function fn_selectToHidden() {
        $q("body").on('change', '.form-select', function () {
            var formFieldID = $q(this).attr("data-form");
            var thisName = $q(this).attr("name");
            var selectedOption = $q(this).children("option:selected").val();
            var thisData = $q(this).val();
            var thisText = $q(this).text();

            //set hidden form field
            $q("#" + formFieldID).val(thisData);

            //set summary info
            $q(".property[data-group = '" + thisName + "'] > span.info").text(selectedOption);

        });
    }


    function fn_setViewSide() {
        $q("body").on('click', '.view', function () {
            var dataSide = $q(this).attr("value");

            $q(".view[value = '" + dataSide + "']:not('.na')").addClass("active");
            $q(".view[value != '" + dataSide + "']:not('.na')").removeClass("active");

            $q("#leftSide").attr("data-side", dataSide);
            var dataProfile = $q("#leftSide").attr("data-profile");

            fn_BuildShirt(dataSide, dataProfile);
            fn_makeZoomLink();
        });
    }

    //make zoom image larger
    function fn_makeZoomLink() {
        var mainImagePathNew = $q("#largeImage").attr("src").replace("wid=420", "wid=2000")
        $q("a.cloud-zoom").attr("href", mainImagePathNew);
        $q('a.cloud-zoom').CloudZoom();
        $q(".cloud-zoom-big").css({ "background-image": "url('" + mainImagePathNew + "')" });

        $q('a.cloud-zoom').CloudZoom();
    }


    //BUILD MONOGRAM
    function fn_buildMonogram() {

        if (monogramStyleValue == null) {
            var monogramStyleValue = "b";
        }

        if (monogramLocationValue == null) {
            var monogramLocationValue = "1";
        }

        if (monogramColorValue == null) {
            var monogramColorValue = "NV";
        }


        //look at radio button for checked yes or no
        $q(".checkbox[name = 'monogramSelection']").click(function () {
            var monogramSelectedValue = $q(this).val();

            $q(".checkbox[value = '" + monogramSelectedValue + "']").prop("checked", true);
            $q(".checkbox[value != '" + monogramSelectedValue + "']").prop("checked", false);

            if (monogramSelectedValue == "no") {
                $q(".monogram-initials").val("");

                // rset monogram form selects
                $q(".monogramFormSelect").each(function () {
                    $q(this).children("option:eq(0)").attr("selected", "selected");
                    $q(this).children("option").removeClass("selected");
                });

                fn_ResetMonogramHdnFields();

                // remove attr values from #leftSide tag
                /*$q("#leftSide").removeAttr("data-monogram-style");
                $q("#leftSide").removeAttr("data-monogram-color");
                $q("#leftSide").removeAttr("data-monogram-location");

                $q("#leftSide").removeAttr("data-monogram-style-chosen");
                $q("#leftSide").removeAttr("data-monogram-color-chosen");
                $q("#leftSide").removeAttr("data-monogram-location-chosen");

                $q("#leftSide").removeAttr("data-monogram-initials");
                $q("#leftSide").removeAttr("data-monogram-single-initials");
                $q("#leftSide").removeAttr("data-monogram-template"); */
            }

            if (monogramSelectedValue == "yes") {
                $q(".subEntry[name = 'monogramOptions']").removeClass("completed");
                trackLinkClickForOmniture(this, "MonogramSelectionYES", "PFCustomShirtDesign", "");
            }

            //set attr on of #leftSide div
            $q("#leftSide").attr("data-monogram", monogramSelectedValue);

            fn_buildMonogramPreview();
            fn_updateCost();
            fn_mainValidate();

        });

        // monogram option selections
        $q(":input.monogram-style").change(function () {
            monogramStyleValue = $q(this).children("option:selected").val();
            var monogramStyleText = $q(this).children("option:selected").text();
            $q(":input.monogram-style").children("option[value = '" + monogramStyleValue + "']").addClass("selected");
            $q(":input.monogram-style").children("option[value != '" + monogramStyleValue + "']").removeClass("selected");

            //set attr on of #leftSide div
            if (monogramStyleValue != "0") {
                $q("#leftSide").attr("data-monogram-style", monogramStyleValue);
                $q("#leftSide").attr("data-monogram-style-chosen", "yes");
                $q(".hdnIsMonoGramSelected").val("yes");
            }

            if (monogramStyleValue == "0") {
                $q("#leftSide").attr("data-monogram-style", "");
                $q("#leftSide").attr("data-monogram-style-chosen", "no");
                $q(".hdnIsMonoGramSelected").val("no");
            }
            fn_mainValidate();
        });

        $q(":input.monogram-location").change(function () {
            monogramLocationValue = $q(this).children("option:selected").val();
            var monogramLocationText = $q(this).children("option:selected").text();
            $q(":input.monogram-location").children("option[value = '" + monogramLocationValue + "']").addClass("selected");
            $q(":input.monogram-location").children("option[value != '" + monogramLocationValue + "']").removeClass("selected");

            //set attr on of #leftSide div
            if (monogramLocationValue != "0") {
                $q("#leftSide").attr("data-monogram-location", monogramLocationValue);
                $q("#leftSide").attr("data-monogram-location-chosen", "yes");
                $q(".hdnIsMonoGramSelected").val("yes");
            }

            if (monogramLocationValue == "0") {
                $q("#leftSide").attr("data-monogram-location", "0");
                $q("#leftSide").attr("data-monogram-location-chosen", "no");
                $q(".hdnIsMonoGramSelected").val("no");
            }
            fn_mainValidate();
        });

        $q(":input.monogram-color").change(function () {
            monogramColorValue = $q(this).children("option:selected").val();
            if (monogramColorValue == "BK") {
                monogramColorValue = "BL"
            }
            var monogramColorText = $q(this).children("option:selected").text();
            $q(":input.monogram-color").children("option[value = '" + monogramColorValue + "']").addClass("selected");
            $q(":input.monogram-color").children("option[value != '" + monogramColorValue + "']").removeClass("selected");

            //set attr on of #leftSide div
            if (monogramColorValue != "0") {
                $q("#leftSide").attr("data-monogram-color", monogramColorValue);
                $q("#leftSide").attr("data-monogram-color-chosen", "yes");
                $q(".hdnIsMonoGramSelected").val("yes");
            }

            if (monogramColorValue == "0") {
                $q("#leftSide").attr("data-monogram-color", "0");
                $q("#leftSide").attr("data-monogram-color-chosen", "no");
                $q(".hdnIsMonoGramSelected").val("no");
            }
            fn_mainValidate();
        });
        // monogram option selections

        //enter initials
        $q(".monogram-initials").click(function () {
            $q(this).val("");
            $q("#leftSide").removeAttr("data-monogram-single-initials");
           // $q("#leftSide").removeAttr("data-monogram-initials");
            //$q("#leftSide").attr("data-monogram-single-initials", "");
            $q(".checkbox[name = 'monogramSelection'][value = 'yes']").prop("checked", true).trigger("click");
            
        });

        $q(".monogram-initials").on('keyup', function () {
            //$q(".checkbox[name = 'monogramSelection'][value = 'yes']").trigger("click");
            if ($q(this).val().length >= 3) {
                $q("#leftSide").attr("data-monogram-single-initials", $q(this).val() );
            }
            if ($q(this).val().length < 3) {
                $q("#leftSide").removeAttr("data-monogram-single-initials");
                //$q("#leftSide").removeAttr("data-monogram-initials");
                    //$q("#leftSide").attr("data-monogram-single-initials", "");
            }

            fn_mainValidate();
            //$q("#leftSide").attr("data-monogram", "yes");
            //$q(".hdnIsMonoGramSelected").val("yes");
        });


        function fn_buildMonogramPreview() {
            var monogramSelectedValue = $q("#leftSide").attr("data-monogram");
            var monogramStyleValue = $q("#leftSide").attr("data-monogram-style");
            var monogramColorValue = $q("#leftSide").attr("data-monogram-color");

            if (monogramSelectedValue == null) {
                monogramSelectedValue = "no";
            }

            if (!monogramStyleValue) {
                monogramStyleValue = "b";
            }

            if (!monogramColorValue || monogramColorValue == "0") {
                monogramColorValue = "NV";
            }

            //get the individual letters
            var monogramInitials = $q(".monogram-initials").val()
            var letterOne = $q(".monogram-initials").val().substring(0, 1);
            var letterTwo = $q(".monogram-initials").val().substring(1, 2);
            var letterThree = $q(".monogram-initials").val().substring(2, 3);
            //end get the individual letters

            //not diamond monogram
            if (monogramStyleValue != "d") {
                var $monoImageOne = monogramStyleValue + "_" + monogramColorValue.toLowerCase() + '_' + letterOne.toUpperCase();
                var $monoImageTwo = monogramStyleValue + "_" + monogramColorValue.toLowerCase() + '_' + letterTwo.toUpperCase();
                var $monoImageThree = monogramStyleValue + "_" + monogramColorValue.toLowerCase() + '_' + letterThree.toUpperCase();
            }
            //end not diamond monogram

            //diamond monogram
            if (monogramStyleValue == "d") {
                var $monoImageOne = monogramStyleValue + "1_" + monogramColorValue.toLowerCase() + '_' + letterOne.toUpperCase();
                var $monoImageTwo = monogramStyleValue + "2_" + monogramColorValue.toLowerCase() + '_' + letterTwo.toUpperCase();
                var $monoImageThree = monogramStyleValue + "3_" + monogramColorValue.toLowerCase() + '_' + letterThree.toUpperCase();
            }
            //end diamond monogram

            var monogramImagePath = S7ImagePath;
            var monogramPreviewImage1 = "<img src='" + monogramImagePath + "mono_"+$monoImageOne + "?&fmt=png-alpha' alt='" + letterOne + "' border='0'>";
            var monogramPreviewImage2 = "<img src='" + monogramImagePath + "mono_"+$monoImageTwo + "?&fmt=png-alpha' alt='" + letterTwo + "' border='0'>";
            var monogramPreviewImage3 = "<img src='" + monogramImagePath + "mono_"+$monoImageThree + "?&fmt=png-alpha' alt='" + letterThree + "' border='0'>";
            



            var contrastCuff = $q(".contrastCuff > img.selected").attr("value");
            var previewBoxBackground = $q("div.optionItem[name='swatch']").children("img.selected").attr("src");
            if (contrastCuff == "black") {
                previewBoxBackground = S7ImagePath + "SPMAR02051";
            }

            if (contrastCuff == "white") {
                previewBoxBackground = S7ImagePath + "SPMAR020510";
            }

            if (contrastCuff == "none") {
                previewBoxBackground = $q("div.optionItem[name='swatch']").children("img.selected").attr("src");
            }


            if (monogramSelectedValue == "yes" && monogramInitials.length == 3) {
                $q(".previewBox")
							.css({ "background-image": "url(" + previewBoxBackground + ")", "background-color": "transparent" })
							.html(monogramPreviewImage1 + monogramPreviewImage2 + monogramPreviewImage3);
            }

            if (monogramSelectedValue != "yes") {
                $q(".previewBox")
							.css({ "background-image": "none", "background-color": "transparent" })
							.html("");
            }
            //get monogram style


            var monogramInitialLayers = "$layer_1_src=mono_" + $monoImageOne + "&$layer_2_src=mono_" +
											$monoImageTwo + "&$layer_3_src=mono_" + $monoImageThree;

            if (monogramStyleValue == "b") {
                var template = "block";
            }

            if (monogramStyleValue == "s") {
                var template = "script";
            }

            if (monogramStyleValue == "d") {
                var template = "diamond";
                var monogramInitialLayers = "&$layer_1_src=mono_" + $monoImageOne + "&$layer_2_src=mono_" +
												$monoImageThree + "&$layer_3_src=mono_" + $monoImageTwo;
            }
            //end monogram style

            //put monogram on main image
            var initialsText = $q(".monogram-initials").val();
            var initialsLength = $q(".monogram-initials").val().length;
            var dataMonogram = $q("#leftSide").attr("data-monogram");
            var monoValueLength = $q(".monogramFormSelect").children("option.selected").length;

            if (dataMonogram == "yes") {
                $q("#leftSide").attr("data-monogram-location", monogramLocationValue);
                $q("#leftSide").attr("data-monogram-template", monogramStyleValue);
                $q("#leftSide").attr("data-monogram-initials", monogramInitialLayers);

                if (monogramInitials.length == 3) {
                    fn_BuildShirt();
                    fn_makeZoomLink();
                }
            }

            if (dataMonogram == "no") {
                fn_BuildShirt();
                fn_makeZoomLink();
            }
            //end put monogram on main image

            fn_updateCost();
        }
        // end monogram preview function


        $q(".monogram-initials").keyup(function () {
            var initialsText = $q(".monogram-initials").val();
            var initialsLength = $q(".monogram-initials").val().length;

            //set attr on of #leftSide div
            $q("#leftSide").attr("data-monogram-single-initials", initialsText);

            if (initialsLength == 3 && initialsText != "None") {
                fn_buildMonogramPreview();
            }
        });

        $q(".monogramFormSelect").change(function () {
            fn_buildMonogramPreview();
            fn_BuildShirt();
            fn_makeZoomLink();
        });
        // end enter initials

        fn_mainValidate();
    }
    // END BUILD MONOGRAM



    //update cost 
    function fn_updateCost() {
        var monoPrice = 0.00
        var dataMonogram = $q("#leftSide").attr("data-monogram");
        if (dataMonogram == null) {
            dataMonogram = "no";
        }

        var hdnListPrice = $q("#leftSide").attr("data-price")
        if (hdnListPrice == "") {
            var hdnListPrice = parseInt(0);
        }


        var hdnQty = parseInt($q(".form-select[data-form = hdnQuantity]").children("option:selected").val());
        if (hdnQty == "") {
            hdnQty = parseInt(1);
        }

        if (dataMonogram == "yes") {
            monoPrice = parseFloat(10.95).toFixed(2);
            $q(".adjustedPrice > span").text(((parseFloat(hdnListPrice) + parseFloat(monoPrice)) * hdnQty).toFixed(2));
            $q(".subPrice > span").text((parseFloat(hdnListPrice) + parseFloat(monoPrice)).toFixed(2));
            $q("#hdnListPrice").val(((parseFloat(hdnListPrice) + parseFloat(monoPrice)) * hdnQty).toFixed(2));
        }

        if (dataMonogram == "no") {
            monoPrice = parseFloat(0.00);
            $q(".adjustedPrice > span").text(((parseFloat(hdnListPrice) + parseFloat(monoPrice)) * hdnQty).toFixed(2));
            $q(".subPrice > span").text((parseFloat(hdnListPrice) + parseFloat(monoPrice)).toFixed(2));
            $q("#hdnListPrice").val(((parseFloat(hdnListPrice) + parseFloat(monoPrice)) * hdnQty).toFixed(2));
        }



    }

    function fn_ResetMonogramHdnFields() {

        jQuery("#leftSide").removeAttr("data-monogram-style");
        jQuery("#leftSide").removeAttr("data-monogram-style-chosen");
        jQuery("#leftSide").removeAttr("data-monogram-location-chosen");
        jQuery("#leftSide").removeAttr("data-monogram-color");
        jQuery("#leftSide").removeAttr("data-monogram-color-chosen");
        jQuery("#leftSide").removeAttr("data-monogram-single-initials");
        jQuery("#leftSide").removeAttr("data-monogram-template");
        jQuery("#leftSide").removeAttr("data-monogram-initials");

        jQuery("#hdnIsMonoGramSelected").val("no");
        jQuery("#hdnMonoGramStyle").removeAttr("value");
        jQuery("#hdnMonoGramStyleValue").removeAttr("value");
        jQuery("#hdnMonoGramLocation").removeAttr("value");
        jQuery("#hdnMonoGramLocationValue").removeAttr("value");
        jQuery("#hdnMonoGramColor").removeAttr("value");
        jQuery("#hdnMonoGramColorValue").removeAttr("value");
        jQuery("#hdnMonoGramInitial").removeAttr("value");
    }


    // set hidden fields with monogram info//
    function fn_monogramHiddenFields() {
        $q(".checkbox[name = 'monogramSelection']").click(function () {
            var dataForm = $q(this).attr("data-form");
            var dataFormValue = $q(this).val();
            $q("#" + dataForm).val(dataFormValue);

            if (dataFormValue == "no") {
                fn_ResetMonogramHdnFields();
            }
        });

        $q(".monogramFormSelect").change(function () {
            var dataForm = $q(this).attr("data-form");
            var dataName = $q(this).attr("name");
            var dataFormStyle = $q(this).attr("data-form") + "Value";

            var dataFormStyleValue = $q(this).children("option:selected").val();
            var dataFormValue = $q(this).children("option:selected").text();

            $q("#" + dataForm).val(dataFormValue);
            $q("#" + dataFormStyle).val(dataFormStyleValue);

            //set properties in review
            $q("span.monoEntry[name = '" + dataName + "']").text(" | " + dataFormValue);
        });

        $q(".monogram-initials").keyup(function () {
            var dataForm = $q(this).attr("data-form");
            var dataName = $q(this).attr("name");
            var valueLength = $q(this).val().length;

            if (valueLength = 3) {
                var thisValue = $q(this).val();
                $q("#" + dataForm).val(thisValue.toUpperCase());

                //set properties in review
                $q("span.monoEntry[name = '" + dataName + "']").text(thisValue.toUpperCase());
            }
        });


    }
    // end set hidden fields with monogram info//


    $q(".form-select[name = 'selectQuantity']").change(function () {
        fn_updateCost();
    });


    $q(".form-select.sizingSelect[name = 'selectFit']").change(function () {
        var thisValue = $q(this).val();
        fitValue = $q(this).val();

        if (thisValue == "Extra Slim Fit") {
            $q(".entry[name = 'styleOptions']").attr("data-complete", "4");

            $q(".entryContent[name = 'pockets']").css({ "display": "none" }).addClass("no-show").hide();
            $q(".entryContent[name = 'pleats']").css({ "display": "none" }).addClass("no-show").hide();
            $q(".optionItem.pocket[data-title = 'No Pocket']").trigger("click");

            $q(".entry[name = 'styleOptions']").attr("data-complete", "4");

            $q(".button-continue.sub[name = 'cuffs']").attr("data-previous", "collars");
            $q(".button-continue.sub[name = 'cuffs']").attr("data-next", "plackets");

            $q(".button-previous.sub[name = 'plackets']").attr("data-previous", "cuffs");
            $q(".button-previous.sub[name = 'plackets']").attr("data-next", "monogram");

            $q(".property[data-group = 'pocketOptions']").children("span.propertyEdit").css({ "display": "none" });
            $q(".property[data-group = 'pleatOptions']").children("span.propertyEdit").css({ "display": "none" });
            $q(".property[data-group = 'pleatOptions']").children("span.info").text("No Pleat");

            $q("#hdnBackPleat").attr("value", "No Pleat");
            $q("#hdnBackPleatValue").attr("value", "NoPleat");
        }

        if (thisValue != "Extra Slim Fit") {
            $q(".entry[name = 'styleOptions']").attr("data-complete", "6");

            $q(".entryContent[name = 'pockets']").removeClass("no-show");
            $q(".entryContent[name = 'pleats']").removeClass("no-show");

            $q(".button-continue.sub[name = 'cuffs']").attr("data-previous", "collars");
            $q(".button-continue.sub[name = 'cuffs']").attr("data-next", "pockets");


            $q(".button-previous.sub[name = 'pleats']").attr("data-previous", "pockets");
            $q(".button-previous.sub[name = 'pleats']").attr("data-next", "plackets");


            $q(".property[data-group = 'pocketOptions']").css({ "display": "block" });
            $q(".property[data-group = 'pocketOptions']").children("span.propertyEdit").css({ "display": "inline" });
            $q(".property[data-group = 'pleatOptions']").css({ "display": "block" });
            $q(".property[data-group = 'pleatOptions']").children("span.propertyEdit").css({ "display": "inline" });
        }

        //fn_BuildShirt(fitValue);

    });

    var newHdnShirt = $q(".hdnShirtFit").val();
    if (newHdnShirt == "Extra Slim Fit") {
        $q(".entry[name = 'styleOptions']").attr("data-complete", "4");

        $q(".entryContent[name = 'pockets']").css({ "display": "none" }).addClass("no-show");
        $q(".entryContent[name = 'pleats']").css({ "display": "none" }).addClass("no-show");

        $q(".entry[name = 'styleOptions']").attr("data-complete", "4");

        $q(".button-continue.sub[name = 'cuffs']").attr("data-previous", "collars");
        $q(".button-continue.sub[name = 'cuffs']").attr("data-next", "plackets");

        $q(".button-previous.sub[name = 'plackets']").attr("data-previous", "cuffs");
        $q(".button-previous.sub[name = 'plackets']").attr("data-next", "monogram");

        $q(".property[data-group = 'pocketOptions']").css({ "display": "none" });
        $q(".property[data-group = 'pleatOptions']").css({ "display": "none" });

        $q("#hdnBackPleat").val("No Pleat");
        $q("#hdnBackPleatValue").val("NoPleat");
    }


    $q(".form-select.sizingSelect").change(function () {
        var dataComplete = $q(".entry[name = 'sizingOptions']").attr("data-complete");
        var dataName = $q(this).attr("name");
        var sizingValue = $q(this).val();

        $q(this).children("option[value = '" + sizingValue + "']").addClass("selected");
        $q(this).children("option[value != '" + sizingValue + "']").removeAttr("class");

        var completedValue = $q(".form-select.sizingSelect").children("option.selected").length;

        if (completedValue == dataComplete && sizingValue != " ") {
            $q(".entry[name = 'sizingOptions']").addClass("complete");
        }
        else {
            $q(".entry[name = 'sizingOptions']").removeClass("complete");
        }
    });

    function fn_PocketsPleats(thisValue) {

        if ($q(".entryContent[name = 'reviewOrder']").css("display") == "block") {


            //var fitValue = $q(":input.sizingSelect[name = 'selectFit']").children("option:selected").val();
            var fitValue = $q(".hdnShirtFit").val();
            var hdnPockets = $q(".hdnPockets").val();
            var hdnPleats = $q(".hdnBackPleat").val();

            var msgAlert = "";
            if ($q(fitValue) != "Extra Slim Fit" && $q(hdnPockets) == "NoPocket") {
                msgAlert += "Please select a pocket style\n"
                alert(msgAlert);
                var EntryName = "styleOptions";
                var dataGroup = "pockets";
                $q(".entry[group = '" + EntryName + "']").removeClass("complete").removeClass("active");
                $q(".entry[group = '" + EntryName + "']").find(".subEntry[group = '" + dataGroup + "']").addClass("active");

                fn_entryClick(EntryName, dataGroup);
            }

            if ($q(fitValue) != "Extra Slim Fit" && ($q(hdnPleats) == "No Pleat" && $q(hdnPockets) != "NoPocket")) {
                msgAlert += "Please select a pleat style\n"
                alert(msgAlert);
                var EntryName = "styleOptions";
                var dataGroup = "pleats";
                $q(".entry[group = '" + EntryName + "']").removeClass("complete");

                fn_entryClick(EntryName, dataGroup);
            }
        }
    }

    $q(".form-select.sizingSelect[name = 'selectFit']").change(function () {
        var thisValue = $q(this).val();

        if (thisValue == "Extra Slim Fit") {
            $q(".view.back").addClass("na").html("Not Available").attr("value", "Front");
        }
        if (thisValue != "Extra Slim Fit") {
            $q(".view.back").removeClass("na").html("View Shirt Back").attr("value", "Back");
        }
        fn_PocketsPleats(thisValue);
    });


    var thisOffset;
    function fn_scrollTo(Next) {
        thisOffset= $(".entry[group = '" + Next + "']").offset().top;

        if ($q("#" + Next).is(".active")) {
            $q('html, body').animate({
                scrollTop: thisOffset.top
            }, 1000);
        }

    }


    // KEEPS MAIN IMAGE AT TOP
    var $right = $q("#rightSide"),
  $imageViewer = $q("div#zoomHolder"),
  $zoomTracker = $q("div.zoomtracker"),
  $window = $q(window),
  $windowHeight = $q(window).height(),
  offset = $right.offset(),
  position = $right.position(),
  offsetTwo = $imageViewer.offset(),
  offsetThree = $zoomTracker.offset()
    var content = $q("div#body-container").offset().top;
    topPadding = 15;

    var top = $q('#rightSide').offset().top - parseFloat($q('#rightSide').css('marginTop').replace(/auto/, 0));

    $window.scroll(function (event) {
        var offset = $right.position();
        var y = $q(this).scrollTop();

        if ($window.scrollTop() >= top) {
            $right.stop()
		  .animate({
		      marginTop: $window.scrollTop() - content - 23 + "px"
		  });

            $imageViewer.stop()
		 .animate({
		     marginTop: $window.scrollTop() - content - 33 + "px"
		 });
        }

        else {
            $right.stop()
		  .animate({
		      marginTop: 15 + "px"
		  });

            $imageViewer.stop()
		  .animate({
		      marginTop: 0 + "px"
		  });
        }
    });


    var $topOfRight = $q("div#rightSide").position();

    var mainWidth = $window.width();
    var mainHeight = $window.height();

    $q("div#shade").css({ "width": $q("html").width() + "px", "height": $q("html").height() * 2 + "px" });


    // KEEPS THE ZOOM TRACKER IN PLACE WHILE SCROLLING
    $window.scroll(function () {
        $imageOff = $q("div#rightSide").offset();
        $imagePos = $q("div#rightSide").position();
        $q("div#zoomHolder").css({ "top": ($imagePos.top) + "px" });
        var mainWidth = $window.width();
        var mainHeight = $window.height();
    });

    $q("span.entryTitle").click(function () {
        var EntryName = $q(this).attr("name");
    });

    function fn_editEntry() {
        $q(".entryEdit").click(function () {
            var Next = $q(this).attr("name");
            var EntryName = $q(this).attr("name");
            fn_scrollTo(Next);
            fn_entryClick(EntryName);
        });
    }

    function fn_editSub() {
        $q(".subEdit").on('click', function () {
            var Next = $q(this).attr("name");
            var EntryName = $q(this).attr("name");
            $q(this).parents(".subEntry").addClass("active");
            $q(".subEdit").not(this).parents(".subEntry").removeClass("active");
            fn_scrollTo(Next);
            fn_entryClick(EntryName);
        });
    }

    function fn_reviewEdit() {
        $q(".propertyEdit").click(function () {
            var dataGroup = $q(this).attr("rel");
            var EntryName = $q(this).attr("name");

            $q(".subEntry[group = '" + dataGroup + "']").addClass("active");
            $q(".subEntry[group != '" + dataGroup + "']").removeClass("active");

            fn_entryClick(EntryName, dataGroup);
            trackLinkClickForOmniture(this, "EDIT:" + dataGroup, "PFCustomShirtDesign", "");
        });
    }

    $q.fn.center = function () {
        this.css("position", "absolute");
        this.css("top", ($q(window).height() - this.height()) / 2 + $q(window).scrollTop() + "px");
        this.css("left", ($q(window).width() - this.width()) / 2 + $q(window).scrollLeft() + "px");
        this.addClass("centered")
        return this;
    }

    $q(".question").click(function () {
        var name = $q(this).attr("name");
        var loadData = "popInfo.html #" + name;
        $q("body").prepend("<div class = 'shade'>");
        $q("body").prepend("<div class = 'load-modal modal'><span class = 'modal-close' >X</span> <div class = 'modal-content'></div></div>");
        $q(".load-modal > .modal-content").load(loadData);
        //$q(".load-modal").center();
        $q(".load-modal").fadeIn(500);
    });



    if ($q(".load-modal")) {
        $q(window).resize(function () {
            //$q(".load-modal").center();
        });

        $q(window).scroll(function () {
            //$q(".load-modal").center();
        });
    }
    $q("body").on('click', '.shade', function () {
        $q(this).fadeOut(500);
        $q(".load-modal").fadeOut(650);
    });

    $q("body").on('click', '.modal-close', function () {
        $q('.load-modal').fadeOut(500).remove();
        $q(".shade").fadeOut(650);
    });






    //***************************  EDIT SECTION ***********************************
    //Pre-populate the controls from hidden fields if this is an EDIT View
    /*$q("div#sizingForm > div#hdnProfile > input").attr("value", document.getElementById("hdnProfile").value);*/


    if (mode == "edit" || redirectPage != '' || ProductFlag == true) {

        

        if ($q('.hdnSKU').val() != "") {


            //Show update button..
            $q(".entry[name = 'reviewOrder'] > .entryContent > .two").children("div#addToBag").fadeIn();


            //hdnCollarSize
            tempHiddenVal = $q('.hdnCollarSize').val();
            $q(".formSelect[name = 'selectCollarSize'] option[value = '" + tempHiddenVal + "']").attr("selected", "selected");
            $q(".formSelect[name = 'selectCollarSize'] option[value = '" + tempHiddenVal + "']").trigger('change');


            //hdnSleeveLength
            //Set the value from hidden variable
            tempHiddenVal = $q('.hdnSleeveLength').val();
            $q(".formSelect[name = 'selectSleeveLength'] option[value = '" + tempHiddenVal + "']").attr("selected", "selected");
            $q(".formSelect[name = 'selectSleeveLength'] option[value = '" + tempHiddenVal + "']").trigger('change');
            //Trigger on change event

            //hdnShirtFit
            tempHiddenVal = $q('.hdnShirtFit').val();
            //Set the value from hidden variable
            $q(".formSelect[name = 'selectFit']").children("option[value = '" + tempHiddenVal + "']").trigger('change');
            $q(".formSelect[name = 'selectFit']").children("option[value = '" + tempHiddenVal + "']").attr("selected", "selected");

            if (tempHiddenVal == "Extra Slim Fit") {

                $q(".entryContent[name = 'pockets']").css({ "display": "none" }).addClass("no-show");
                $q(".entryContent[name = 'pleats']").css({ "display": "none" }).addClass("no-show");

                $q(".entry[name = 'styleOptions']").attr("data-complete", "4");

                $q(".button-continue.sub[name = 'cuffs']").attr("data-previous", "collars");
                $q(".button-continue.sub[name = 'cuffs']").attr("data-next", "plackets");

                $q(".button-previous.sub[name = 'plackets']").attr("data-previous", "cuffs");
                $q(".button-previous.sub[name = 'plackets']").attr("data-next", "monogram");

                $q(".property[data-group = 'pocketOptions']").css({ "display": "none" });
                $q(".property[data-group = 'pleatOptions']").css({ "display": "none" });

                $q(".property[data-group = 'selectFit']").children(".info").text("Extra Slim Fit");

                $q(".hdnPockets").val("NoPocket");
                $q(".hdnPocketsValue").val("NP");

                $q(".hdnPleats").val("NoPleat");
                $q(".hdnPleatsValue").val("NP");
            }

            //Trigger on change event

            //hdnShirtBody
            tempHiddenVal = $q('.hdnShirtBody').val();
            $q(".formSelect[name = 'selectBodyLength']").children("option[value = '" + tempHiddenVal + "']").attr("selected", "selected");
            $q(".formSelect[name = 'selectBodyLength']").children("option[value = '" + tempHiddenVal + "']").trigger('change');
            //Trigger on change event


            //hdnCollarStyle
            tempHiddenVal = $q('.hdnCollarStyle').val();
            $q(".optionItem.collar[data-title = '" + $q.trim(tempHiddenVal) + "']").trigger("click");

            //Set the value and Trigger Click event

            //hdnContrastingCollar
            tempHiddenVal = $q('.hdnContrastingCollar').val();
            $q(".optionItem.contrastCollar[data-title = '" + $q.trim(tempHiddenVal) + "']").trigger("click");
            //Set the value and Trigger Click event

            //hdnCollarStitch
            tempHiddenVal = $q('.hdnCollarStitch').val();
            $q(".optionItem.collarStitch[data-title = '" + $q.trim(tempHiddenVal) + "']").trigger("click");
            //Set the value and Trigger Click event

            //hdnCuffStyle
            tempHiddenVal = $q('.hdnCuffStyle').val();
            $q(".optionItem.cuff[data-title = '" + $q.trim(tempHiddenVal) + "']").trigger('click');
            //Set the value and Trigger Click event

            //hdnContrastingCuff
            tempHiddenVal = $q('.hdnContrastingCuff').val();
            $q(".optionItem.contrastCuff[data-title = '" + $q.trim(tempHiddenVal) + "']").trigger('click');
            //Set the value and Trigger Click event

            //hdnPockets
            tempHiddenVal = $q('.hdnPockets').val();
            $q(".optionItem.pocket[data-title = '" + $q.trim(tempHiddenVal) + "']").trigger('click');
            //Set the value and Trigger Click event

            //hdnBackPleat
            tempHiddenVal = $q('.hdnBackPleat').val();
            $q(".optionItem.pleat[data-title = '" + $q.trim(tempHiddenVal) + "']").trigger('click');
            //Set the value and Trigger Click event

            //hdnFrontPlacket
            tempHiddenVal = $q('.hdnFrontPlacket').val();
            $q(".optionItem.placket[data-title = '" + $q.trim(tempHiddenVal) + "']").trigger('click');
            //Set the value and Trigger Click event

            //hdnIsMonoGramSelected
            var IsMonoGramSelected = $q('.hdnIsMonoGramSelected').val();
            $q("div#styleOptions > div.monogram").find("input[name = 'monogramSelection'][value = '" + tempHiddenVal + "']").attr("checked", "checked");
            $q("div#styleOptions > div.monogram").find("input[name = 'monogramSelection'][value != '" + tempHiddenVal + "']").removeAttr("checked");
            //var $objIsMonoGramSelected = $q("div#styleOptions > div.monogram").find("input[name = 'monogramSelection'][value = '" + tempHiddenVal + "']");
            //$objIsMonoGramSelected.attr("checked", "checked"); //Set the value YES or NO


            if (IsMonoGramSelected == "yes") {
                tempHiddenVal = $q('.hdnMonoGramStyle').val();
                $q(".monogramFormSelect[name='PFStandardLayout_MainContent_ddStyle'] > option[title = '" + tempHiddenVal + "']").attr("selected", "selected"); //Set the value from hidden variable
                $q(".monogramFormSelect[name='PFStandardLayout_MainContent_ddStyle'] > option").trigger('change'); //Trigger on change event

                //hdnMonoGramLocation
                tempHiddenVal = $q('.hdnMonoGramLocation').val();
                $q(".formSelect[name='PFStandardLayout_MainContent_ddLocation'] option[title = '" + tempHiddenVal + "']").attr("selected", "selected"); //Set the value from hidden variable
                $q(".formSelect[name='PFStandardLayout_MainContent_ddLocation'] option[title = '" + tempHiddenVal + "']").trigger('change'); //Trigger on change event

                //hdnMonoGramColor
                tempHiddenVal = $q('.hdnMonoGramColor').val();
                $q(".formSelect[name='PFStandardLayout_MainContent_ddColor'] option[title = '" + tempHiddenVal + "']").attr("selected", "selected"); //Set the value from hidden variable
                $q(".formSelect[name='PFStandardLayout_MainContent_ddColor'] option[title = '" + tempHiddenVal + "']").trigger('change'); //Trigger on change event

                //hdnMonoGramInitial
                tempHiddenVal = $q('.hdnMonoGramInitial').val();
                $q("div#monogramOne > input[name='PFStandardLayout_MainContent_txtInitials']").val(tempHiddenVal);
                $q("div#monogramOne > input[name='PFStandardLayout_MainContent_txtInitials']").trigger('keyup');


            }

            //Trigger monogram radio button click event
            $q("input[name = 'monogramSelection'][value = '" + IsMonoGramSelected + "']").trigger('click');

            //09/06/2012 - For somereason on edit mode the monogram section is not marked as Completed
            ////TODO: move the below logic where appropitate
            if (IsMonoGramSelected == "yes" || IsMonoGramSelected == "no") {
                $q("div.entry > div.monogram").addClass("completed");
                $q("div.entry > div.monogram > span.subEntry").addClass("completed");
                $q("div.entry > div.monogram > span.subEntryTitle").addClass("completed");
            }

            //Quantity 
            tempHiddenVal = $q('.hdnQuantity').val();
            $q(".formSelect[name='selectQuantity']").val(tempHiddenVal);
            $q(".formSelect[name='selectQuantity']").trigger('change');


            imageURL2 = document.getElementById("imgURL").value
            //$q("img#largeImage").attr("src").replace("wid=420","wid=2000");
            $q("img#largeImage").attr("src", imageURL2);
            $q("a.cloud-zoom").attr("href", imageURL2);
            $q(".cloud-zoom-big").css({ "background-image": "url('" + imageURL2 + "')" });

            //expand review section
            $q(".entry[name = 'reviewOrder']").addClass("active");
            $q(".entry[name = 'reviewOrder'] > .entryContent").addClass("active").css({ "display": "block" });


        }

    }

    //END Pre-Populate controls
    //*************************** END - EDIT SECTION ***********************************

    fn_continueClick();
    fn_previousClick();
    fn_subNextClick();
    fn_subPreviousClick();
    fn_subEntryClick();

    fn_selectToHidden();
    fn_monogramHiddenFields();

    fn_setViewSide();
    fn_setAttr();

    //var fitValue = $q(".hdnShirtFit").val()

    //fn_BuildShirt(fitValue);
    fn_BuildShirt();

    fn_swatchClick();
    fn_optionItemClick();
    fn_buildMonogram();

    fn_makeZoomLink();

    fn_mainValidate();

    fn_editEntry();
    fn_editSub();
    fn_reviewEdit();


});