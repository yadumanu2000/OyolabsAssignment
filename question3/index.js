const mysql = require('mysql')

const customers = [
  {
    email: 'anurag11@yopmail.com',
    name: 'anurag',
  },
  {
    email: 'sameer11@yopmail.com',
    name: 'sameer',
  },
  {
    email: 'ravi11@yopmail.com',
    name: 'ravi',
  },
  {
    email: 'akash11@yopmail.com',
    name: 'akash',
  },
  {
    email: 'anjali11@yopmail.com',
    name: 'anjali',
  },
  {
    email: 'santosh11@yopmail.com',
    name: 'santosh',
  },
]

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
})

// eslint-disable-next-line no-shadow
function insertCustomers(customers) {
  return new Promise((resolve, reject) => {
    customers.forEach(customer => {
      const {email, name} = customer
      connection.query(
        'INSERT INTO customers (email, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = ?',
        [email, name, name],
        (error, results) => {
          if (error) {
            reject(error)
          }
          resolve(results)
        },
      )
    })
  })
}

connection.connect(error => {
  if (error) {
    console.error('Error connecting to database:', error)
    return
  }

  insertCustomers(customers)
    .then(results => {
      console.log('Customers inserted successfully:', results)
      connection.end()
    })
    // eslint-disable-next-line no-shadow
    .catch(error => {
      console.error('Error inserting customers:', error)
      connection.end()
    })
})
