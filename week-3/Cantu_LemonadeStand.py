# Course: WEB335
# Instructor: Richard Krasso
# Student: Jonathan Cantu
# Assignment: Hands-On 2.1: Functions

def calculate_cost(lemons_cost, sugar_cost):
    return lemons_cost + sugar_cost

def calculate_profit(lemons_cost, sugar_cost, selling_price):
    return selling_price - calculate_cost(lemons_cost, sugar_cost)

lemons_cost = 3.50
sugar_cost = 1.25
selling_price = 10.00

total_cost = calculate_cost(lemons_cost, sugar_cost)
profit = calculate_profit(lemons_cost, sugar_cost, selling_price)

cost_output = f"{lemons_cost} + {sugar_cost} = {total_cost}"
profit_output = f"Selling price: {selling_price} | Profit: {profit}"

print(cost_output)
print(profit_output)

