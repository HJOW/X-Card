# X-Card

## 이 프로젝트는? (What is this project?)

   X Card 게임은 HTML과 타입스크립트로 작성되었습니다.
   이 프로젝트는 Windows Universal App 으로 배포될 예정이지만, 브라우저로도 실행이 가능하도록 개발중입니다.   
   
   X Card is card game run on HTML and typescript.
   This project will run on Windows Universal App, but codes will capable on browser.
   
   
## 게임 규칙 (Game Rule)
   
   플레이어는 최소 2명 이상이어야 하고, 최대 제한은 없지만 4명이서 플레이하는 것을 권장합니다.
   인공지능 컴퓨터와의 플레이를 지원할 예정입니다.   
   There must be at least two players, and there is no maximum limit, but it is recommended that four players play.
   We will support play with simple AI computer.
   
   
   이 게임은 턴제 카드 게임입니다.   
   This game is a turn-based card game.
   
   
   이 게임에서 사용하는 카드는, -1 ~ 10 사이의 숫자와, ＋－× 3가지 기호 중 각 하나씩이 그려져 있습니다.
   이와 같이, 카드 1세트에는 33가지 다른 종류의 카드가 있습니다.   
   The cards used in this game are represented by numbers between -1 and 10, and three symbols (＋－×);
   As such, there are 33 different types of cards in a set of cards.
   
   Example)
      Player 1 have 4 cards like... [＋1][＋5][－4][×(-1)]
   
   
   게임에서는 플레이어 수 만큼의 세트의 카드들을 사용합니다.
   예를 들어, 2명의 플레이어가 있다면 66장의 카드로 게임을 진행합니다.   
   The game uses as many sets of cards as there are players.
   For example, if two people play the game, the game will be played with 66 cards.
   
   
   게임이 시작되면, 카드를 섞은 후 각 플레이어는 카드를 10장씩 받습니다.
   남은 카드는 "덱"에 보이지 않게 놓습니다.   
   When the game starts, each player receives 10 cards after shuffling.
   Place the remaining cards invisible on the "deck".
   
   
   플레이어는 자신이 받은 카드를 상대방이 보이지 않도록 합니다.   
   The player will not see the opponent's card.
   
   
   자신의 차례가 되면, 플레이어는 덱에서 카드를 한 장 받거나, 또는
   받은 자신의 카드 한 장을 다른 플레이어의 자리에 카드를 놓아야 합니다.
   자리에 놓인 카드는 게임이 끝날 때까지 사용이 불가능하며, 누구나 볼 수 있도록 놓아야 합니다.   
   When you are on your turn, the player either takes a card from the deck, or
   You must place one card of your own card in place of another player.
   Cards placed are not available and must be placed for viewing by anyone.
   
   
   플레이어의 자리에 이미 놓인 카드가 있다면, 그 곳에 아무 카드나 놓을 수 없습니다.
   마지막에 놓인 카드의 숫자, 혹은 기호가 동일한 카드만 놓을 수 있습니다.
   단, 숫자가 1인 카드는 예외적으로 숫자나 기호가 다른 자리에 놓을 수 있습니다.   
   If there is already a card in the player's seat, no cards can be placed there.
   Only cards with the same number of symbols or symbols at the end can be "placed".
   However, a card with a number of 1 can be placed in a different number or symbol.
   
   
   마지막에 놓인 카드의 숫자가 7인 자리에는 그 자리의 주인만 카드를 놓을 수 있습니다.
   If the number of the last card "placed" is 7, only the owner of the place can place another card.
   
   
   덱에 카드가 한 장도 없거나, 받은 카드를 모두 소진한 플레이어가 1명이라도 있다면 게임이 끝나고 점수를 계산합니다.
   If there is no card on deck, or someone who doesn't have any card, the game ends and scores should be calculated.
   
   
   점수는 플레이어의 자리에 놓인 카드들을 순서대로 수학 연산하듯이 계산됩니다. 놓인 카드가 없으면 0점입니다.
   계산 순서는 연산자와 상관없이 순서대로 진행합니다.
   The score is calculated as a mathematical operation of the cards "placed" for the player.
   If there are no cards left, it is 0.
   Calculations are performed in order, regardless of operator.
   
   
   Example)
       Player "A" 's "placed" cards : [＋5][－5][－6][－6][＋4][×4]
       Point calculation : (0 ＋ 5 － 5 － 6 － 6 ＋4) × 4 = －32
       
       The player "A" get "-32" points.
       
       
   점수가 가장 높은 플레이어가 승리합니다.   
   The player with the highest score wins.

## 사용된 외부 라이브러리 (Dependencies)

   * jQuery : https://jquery.com/
       (license : MIT)
   * jQuery UI : https://jqueryui.com/
       (license : MIT)
   * BigInteger.js : https://www.npmjs.com/package/big-integer?activeTab=readme
       (license : Unlicense. (Public Domain))

## 라이센스 (License)

   Copyright 2018 HJOW (hujinone22@naver.com)
   
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
   
       http://www.apache.org/licenses/LICENSE-2.0
   
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
