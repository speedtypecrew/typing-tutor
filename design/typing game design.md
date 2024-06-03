# Game Design:

- Have user fill in 'ghost text' of the practice sentences. Use color to differentiate between correct and incorrect inputs.
- Stop the user from using spacebar before min chars of words are typed?
- Option to require fully correct word before advancing
- Option to require backspaces to correct errors

# Typing Game Design Document

## Title Page
**Game Title**:  Typing Tutor
**Subtitle (if any)**:  
**Version Number**:  .001
**Author(s)**:  Talon Hintze, Danny Kim, Bryce Chesley, Haein Lee, Tyrone Gonzalez, Zach McLaughin
**Date**:  6/3/24

---

## Table of Contents
- [Game Design:](#game-design)
- [Typing Game Design Document](#typing-game-design-document)
  - [Title Page](#title-page)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Feature List](#feature-list)
  - [Gameplay Mechanics](#gameplay-mechanics)
  - [Appendices](#appendices)

---

## Introduction
**Overview**: A typing game, written in JS and HTML5 and hosted with Django.
**Genre**: Typing Game  
**Platform**:  Django Webapp
**Target Audience**:  Anyone who wants to improve their typing abilities

---

## Feature List
- **Typing Challenges**: Timed highscore mode
- **Difficulty Levels**: Three levels of difficulty
- **Scoring System**: Points awarded for speed, accuracy, and completion of challenges.
- **Progress Tracking**: Track player progress over time with statistics, award ranks with fun names, like "Keyboard Baby"
- **Customizable Settings**: Options for customizing typing interface, such as font size, color schemes, and key layout.
- **Practice Mode**: Free practice sessions without scoring for skill improvement.

---

## Gameplay Mechanics
**Core Gameplay**:  
- **Typing Challenges**: 
  - **Speed Test**: Players type as quickly as possible within a time limit.
  - **Accuracy Drill**: Players focus on typing accurately with penalties for errors.
  - **Themed Challenges**: Typing passages related to specific themes (e.g., literature, coding, quotes).
  
**Controls**:  
- **Keyboard Usage**: Standard keyboard input; describe any special key functions or combinations.

**Progression System**:  
- **Levels**: Players advance through levels that progressively increase in difficulty.
- **Unlockables**: New challenges, themes, and customization options unlocked as players progress.
- **Ranks**: Players unlock various named 'ranks' as they level up
- **Leaderboards**: Players can see how they compare with the rest of the competition.

**Rewards System**:  
- **Achievements**: List of in-game achievements players can earn for specific feats.
- **In-game Rewards**: Description of rewards like badges, new themes, and avatars given for high scores or completing challenges.

**User Interface (UI)**:  
- **Main Menu**: Overview of the main menu layout and options.
- **In-game HUD**: Description of the heads-up display during gameplay, including score, timer, and accuracy indicators.
- **Progress Tracking Screen**: Interface showing player statistics, progress, and achievements.

**Feedback Mechanisms**:  
- **Immediate Feedback**: Visual and auditory feedback for correct and incorrect key presses.
- **End-of-Challenge Summary**: Detailed summary of performance after each challenge, including speed, accuracy, and areas for improvement.

**Customization Options**:  
- **Interface Customization**: Options for changing the look and feel of the typing interface.
- **Audio Settings**: Control over sound effects and background music.
- **Difficulty Settings**: Adjustments for game difficulty to cater to different skill levels.

---

## Appendices
**Glossary**:  
**References**:  

