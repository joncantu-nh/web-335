"""
Author: Jonathan Cantu
Date: July 4, 2026
File Name: weekly_schedule.py
Description: This program manages a weekly schedule for a lemonade stand.
It demonstrates the use of lists, for loops, and conditional statements.
"""

tasks = [
    "Buy some lemons",
    "Purchase sugar",
    "Make some lemonade",
    "Sell some lemonade",
    "Tally up earnings"
]

print("Lemonade Stand Tasks:")
for task in tasks:
    print("- " + task)

print() 

# List of days of the week
days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

print("Weekly Schedule:")

task_index = 0

for day in days:

    if day == "Saturday" or day == "Sunday":
        print(day + ": Day off: Chill out and jam on my guitar! (or beat on my drum... whatever...)")
    else:
        print(day + ": " + tasks[task_index])
        task_index += 1
