### Getting Data
To get data from the database make a GET request to   
```https://line-drive-betting.appspot.com/Matchup?datatype=<DATATYPE>&teama=<TEAMA>&teamb=<TEAMB>```      
```https://line-drive-betting.appspot.com/Matchup/bySite?datatype=<DATATYPE>&teama=<TEAMA>&teamb=<TEAMB>&bettingsite=<SITE>```       
```https://line-drive-betting.appspot.com/Matchup/sinceTime?datatype=<DATATYPE>&teama=<TEAMA>&teamb=<TEAMB>&since=<SINCE>```        
```<COLLECTION>``` is the collection to access (Matchup for match data)    
```<DATATYPE>``` is the datatype you want to access (ex. overUnder)     
```<TEAMx>``` is the teams involed (order doesn't matter)      
```<SINCE>``` is optional and allows you to specify a start point for data formated as the time from epoch in milliseconds (uses ```new Date().getTime()``` format)      
```<SITE>``` is the website that the betting data is sourced from      

### Adding Data
To add data to the database just make a POST request to https://line-drive-betting.appspot.com/Matchup
For adding team match up data please use the "BettingLines" collection
The format for payloads to the Database are formatted as such:

```json
{
    Teams          : ["<TEAMA>", "<TEAMB>"],
    DataType       : "<TYPE OF DATA>",
    Value          : "<VALUE OF DATA>"
    BettingSite    : "<BETTING SITE>"
    EventStartTime : "<START TIME OF THE GAME>"
    createdAt      : "<TIME OF ADDING TO DATABASE>"
}
```

the server will add the correct time for the entry so just add them in chronological order.
