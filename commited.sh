#!/bin/bash
message=$1
declare -a names=("Melanie Bochero" "Laura Cardenas" "Laura Cardenas" "Catalina Largo")
declare -a emails=("melanieuwu28@gmail.com" "lauracard854@gmail.com" "katalinalargo24@gmail.com" "katalinalargo24@gmail.com")
selected=$((0 + RANDOM % 4))
name=${names[$selected]}
email=${emails[$selected]}
echo "Running git commit command with the user ${name} ${email} and message: $message"
git commit --author="$name <$email>" -m "$message"

