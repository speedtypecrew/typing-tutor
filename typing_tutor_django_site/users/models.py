from django.db import models

# Create your models here.

class Rank(models.Model):
    rankname = models.CharField(max_length=20)
    points = models.IntegerField()
    icon = models.ImageField(upload_to='icons/')

    def __str__(self):
        return self.rankname

class User(models.Model):
    fname = models.CharField(max_length=20)
    lname = models.CharField(max_length=20)
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=20, null=True)
    points = models.IntegerField()
    rank = models.ForeignKey(Rank, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.fname} {self.lname} ({self.username})"
    
class TypingTest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    original_text = models.TextField()
    user_input = models.TextField()
    correct_words = models.IntegerField()
    wpm = models.FloatField()
    score = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)