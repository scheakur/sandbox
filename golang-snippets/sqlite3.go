package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db := openDb()
	defer closeDb(db)
	createTable(db)
	insertData(db)
	selectAll(db)
	selectOne(db, 7)
	selectOne(db, 999)
	deleteData(db)
	deleteTable(db)
}

func openDb() *sql.DB {
	os.Remove("./example.db")
	db, err := sql.Open("sqlite3", "./example.db")
	if err != nil {
		log.Fatal(err)
	}
	return db
}

func createTable(db *sql.DB) {
	exec(db, `create table example (id integer not null primary key, value text)`)
}

func insertData(db *sql.DB) {
	tx, err := db.Begin()
	if err != nil {
		log.Fatal(err)
	}

	stmt, err := tx.Prepare(`insert into example(id, value) values(?, ?)`)
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()

	for i := 0; i < 10; i++ {
		_, err = stmt.Exec(i, fmt.Sprintf("Example %02d", i))
		if err != nil {
			log.Fatal(err)
		}
	}

	tx.Commit()
}

func selectAll(db *sql.DB) {
	rows, err := db.Query(`select id, value from example`)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	for rows.Next() {
		var id int
		var value string
		rows.Scan(&id, &value)
		fmt.Println(id, value)
	}
}

func selectOne(db *sql.DB, id int) {
	stmt, err := db.Prepare(`select value from example where id = ?`)
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()

	var value string
	err = stmt.QueryRow(id).Scan(&value)

	switch {
	case err == sql.ErrNoRows:
		fmt.Printf("No data with that ID [%d]", id)
	case err != nil:
		log.Fatal(err)
	default:
		fmt.Println(id, value)
	}
}

func deleteData(db *sql.DB) {
	tx, err := db.Begin()
	if err != nil {
		log.Fatal(err)
	}
	_, err = tx.Exec(`delete from example`)
	if err != nil {
		log.Fatal(err)
	}
	tx.Commit()
}

func deleteTable(db *sql.DB) {
	exec(db, `drop table example`)
}

func closeDb(db *sql.DB) {
	db.Close()
	os.Remove("./example.db")
}

func exec(db *sql.DB, sqlStmt string) {
	_, err := db.Exec(sqlStmt)
	if err != nil {
		log.Fatal(err)
	}
}
