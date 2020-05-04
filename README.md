# Basic MySql To MongoDB
Basic "update" and "delete" queries convertion from MySql to MongoDB.

*this is a hard-coded script*

Just clone or download the code and open the index.html file on your browser.

### Version: 0.0.2

### Example:
MySql:
- update table set column = 'value' where id = 1;
- delete from table where id = 1;

MongoDB:
- db.collection.update({id:2},{$set:{column:"value"}});
- db.collection.remove({id:{$eq:1}});
