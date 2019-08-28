var currentPlayer = "player1";
var winner = $(".winner");
var diagonalSlot = [
    [0, 7, 14, 21],
    [1, 8, 15, 22],
    [2, 9, 16, 23],
    [3, 8, 13, 18],
    [4, 9, 14, 19],
    [5, 10, 15, 20],
    [6, 13, 20, 27],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 14, 19, 24],
    [10, 15, 20, 25],
    [11, 16, 21, 26],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
    [14, 21, 28, 35],
    [15, 20, 25, 30],
    [16, 21, 26, 31],
    [17, 22, 27, 32],
    [18, 25, 32, 39],
    [19, 26, 33, 40],
    [20, 27, 34, 41],
    [21, 26, 31, 36],
    [22, 27, 32, 37],
    [23, 28, 33, 38]
];

(function() {
    $(".button").on("click", function() {
        //lost the whole Sunday bcz my button was inside of the main loop
        winner.hide();
        saveTheWorldAgain();
    });

    $(".column").on("click", function(e) {
        play($(e.currentTarget));
    });
})();

function play(col) {
    var slotsInColumn = col.find(".slot");
    for (var i = 5; i >= 0; i--) {
        //looping through slots
        if (
            !slotsInColumn.eq(i).hasClass("player1") &&
            !slotsInColumn.eq(i).hasClass("player2")
        ) {
            slotsInColumn.eq(i).addClass(currentPlayer);
            targetRow = i;
            break; //we need to stop checking after one loop run
        }
    }
    if (i == -1) {
        return;
    }

    if (
        checkVictory(slotsInColumn) ||
        checkVictory($(".row" + i)) ||
        diagonalWinner(diagonalSlot)
    ) {
        winner.show();
        $(".column").off("click");
    }

    switchPlayers();
}

function diagonalWinner() {
    var diagonalCount = 0;
    var slot = $(".slot");

    for (var i = 0; i < diagonalSlot.length; i++) {
        diagonalCount = 0;
        var count = 0;
        for (var j = 0; j < diagonalSlot[i].length; j++) {
            if (slot.eq(diagonalSlot[i][j]).hasClass(currentPlayer)) {
                count++;
            }
        }
        if (count == 4) {
            $("." + currentPlayer).slideUp(3000, "linear");
            winner.addClass("pobjednik");
            return diagonalSlot[i];
            // umjesto return true moram staviti an array igraca !!!
        }
    }
}

function checkVictory(slot) {
    var count = 0;
    for (var i = 0; i < slot.length; i++) {
        if (slot.eq(i).hasClass(currentPlayer)) {
            count++;
        } else {
            count = 0;
        }
        if (count == 4) {
            console.log("WINNER");
            $("." + currentPlayer).slideUp(5000, "linear");
            winner.addClass("pobjednik");
            return true;
            break;
        }
    }
}

// restart the game
function saveTheWorldAgain() {
    $(".player1").removeClass("player1");
    $(".player2").removeClass("player2");
    $(".slot").show();
    $(".column").on("click", function(e) {
        play($(e.currentTarget));
    });
}

//switching the players function
function switchPlayers() {
    if (currentPlayer == "player1") {
        currentPlayer = "player2";
    } else currentPlayer = "player1";
}
