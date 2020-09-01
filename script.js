$(document).ready(function(){

    var source = $('#day-template').html();
    var template = Handlebars.compile(source);

    // Variabili globali 
    
    var prev = $('.prev');
    var next = $('.next');
    var monthName = $('.month');
    var monthDays = $('.month-days');
    moment.locale('it')
    var startingDate = moment('2018-01-01');
    var day = startingDate;
    var mese = startingDate.format('MMMM')
    console.log(day)
    console.log(mese)

    stampaMesiGiorni(startingDate)
    stampoFeste(startingDate)
    
    prev.click(function(){
        stampaMesiPrev();
    });


    next.click(function(){
        stampaMesiNext();
    });





/*******************************Funzioni*****************************/ 


    function stampoFeste(date){   

        // inializzo la chiamata ajax all interno della funzione
        $.ajax({
          url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
          method: 'GET',
          data: {
            year: date.year(),
            month: date.month()
          },
          success: function(a){
            //   imposto una variabile dove salvare i miei dati ricevuti con il metode get
            var feste = a.response;

            // imposto il mio ciclo che andra a scorrere l oggetto alla ricerca di feste se le trova aggiunge il nome della festa, e la classe festa
            for ( var i = 0; i < feste.length; i++) {
              var questaFesta = feste[i];
              console.log(questaFesta)
              var listItem = $('li[data-complete-date="' + questaFesta.date + '"]');
              if ( listItem ) {
                listItem.text( listItem.text() + ' - ' + questaFesta.name );
                listItem.addClass('festa')
              }
            }
          },
          error: function(){
            console.log('Errore');
          }
        });
      };





    function stampaMesiGiorni(data){
        // salvo in una var quanti giorni sono presenti nel mese
        var daysInMonth = data.daysInMonth();
        console.log(daysInMonth)
        monthName.html( data.format('MMMM - YYYY') );
        // aggiungo all h2 month l attributo , con la data yyyy-mmmm-dd
        monthName.attr( 'data-this-date', data.format('YYYY-MM-DD') );
        // inizializzo il ciclo
        for ( var i = 0; i < daysInMonth; i++ ) {
          var thisDate = moment({
            year: data.year(),
            month: data.month(),
            day: i+1
          });
          var monthDay = {
            dayClass: 'day',
            completeDate: thisDate.format('YYYY-MM-DD'),
            day: thisDate.format('DD dddd')
          };
          var dayToPrint = template(monthDay);
          monthDays.append(dayToPrint);
          console.log(dayToPrint);
        };
      };




      function stampaMesiPrev(){
        if ( startingDate.month() == 0 ) {
          alert('You cant go back in the past');
        }
        else {
          startingDate.subtract(1, 'M');
          monthDays.children().remove();
          stampaMesiGiorni(startingDate);
          stampoFeste(startingDate);
         
        }
      };



      function stampaMesiNext(){
        if ( startingDate.month() == 11 ) {
          alert('you cant go in the future....yet');
        }
        else {
          startingDate.add(1, 'M');
          monthDays.children().remove();
          stampaMesiGiorni(startingDate);
          stampoFeste(startingDate);
        }
      };
    
});


