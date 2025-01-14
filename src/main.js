const bcrypt = require('bcrypt');
const fs = require('fs');
const { PassThrough } = require('stream');

function registerUser(username, plainPassword){
    const saltRounds  = 10;
    bcrypt.hash(plainPassword, saltRounds, function(e, hash){
        if(e){
            console.log('Error hashing password:', e);
            return;
        }

        const newUser = {
            username: username,
            password: hash
        };

        fs.readFile('users.json', 'utf8', function(e, data){
            let users = [];
            if(e){
                if(e.code === 'ENOENT'){
                    console.log('File not found', e);
                    return;
                }
                else{
                    users = JSON.parse(data).users;
                }
                users.push(newUser);
                const updatedData = JSON.stringify({users: users}, null, 2);
                fs.writeFile('users.json', updatedData, 'utf8', function(e){
                    if(e){
                        console.log('Error writing to file', e);
                    }else{
                        console.log('User data saved successfully')
                    }
                })
            }
        })

    })
}


registerUser('swedenmaster', '1234')
