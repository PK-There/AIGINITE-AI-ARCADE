MEDIA FOLDER STRUCTURE
======================

This folder contains categorized media for the Truth Detector game.

FOLDER STRUCTURE:
-----------------
/media/
  ├── images/         - General images for fake news detection
  ├── videos/         - Videos for deepfake detection  
  ├── audios/         - Audio files for AI voice detection
  ├── deep-ai-pics/   - AI-generated or deepfake images
  └── news/           - News articles and posts (uses full AI analysis)

HOW TO ADD MEDIA:
-----------------
1. Place your files in the appropriate category folder
2. Name them sequentially: 1.jpg, 2.jpg, 3.png, etc. OR use any name
3. Supported formats:
   - Images: .jpg, .jpeg, .png, .gif, .webp
   - Videos: .mp4, .webm, .mov, .avi
   - Audio: .mp3, .wav, .ogg, .m4a

HOW IT WORKS:
-------------
- The system randomly picks ONE file from EACH category folder
- Creates 5 rounds (one per category)
- For "news" folder: Uses FULL AI analysis to generate questions
- For other folders: Uses MINIMAL AI help (basic templates)

EMPTY FOLDERS:
--------------
If a folder is empty, the system will skip that category and show:
"There's nothing related to this content"

EXAMPLE:
--------
/media/images/1.jpg
/media/images/2.png
/media/videos/sample.mp4
/media/news/article1.jpg

The game will randomly select:
- One from images/
- One from videos/ 
- Skip audios/ and deep-ai-pics/ (empty)
- One from news/ (with full AI analysis)

GET STARTED:
------------
Add at least one file to each folder you want to use!
