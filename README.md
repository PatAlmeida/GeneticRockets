# Genetic Rockets

Uses a genetic algorithm to simulate "rockets" finding a target. Inspired by the following YouTube video: https://www.youtube.com/watch?v=bGz7mv2vD6g

Although code is presented in that video, the code in this repo is my own, although some of the physics is inspired from the video.

The rockets start knowing nothing, and fly everywhere. Their goal is to avoid the circle in the center and find the red circle at the top of the screen. After each generation, crossover mutation is done to create the next generation. The "fitness" of each rocket is determined by how close it is to the red target. Including the time it takes to reach the target could make the fitness better.

A sample run of the program is included in the demos directory.
