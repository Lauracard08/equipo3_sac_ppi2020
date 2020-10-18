#!/bin/bash
message=$1
declare -a names=("Sara Gineth" "Sara Gineth" "Sara Gineth" "Catalina Largo")
declare -a emails=("sagiveca09@gmail.com" "sagiveca09@gmail.com" "sagiveca09@gmail.com" "katalinalargo24@gmail.com")
selected=$((0 + RANDOM % 4))
name=${names[$selected]}
email=${emails[$selected]}
echo "Running git commit command with the user ${name} ${email} and message: $message"
git commit --author="$name <$email>" -m "$message"

