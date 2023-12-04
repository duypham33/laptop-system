import pandas as pd
import neattext.functions as nfx
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

df = pd.read_csv('data/laptop_data.csv').drop(columns=["Unnamed: 0"])
baseRecDf = pd.DataFrame({"description": df["Company"] + " " + df["TypeName"] + " " 
+ df["OpSys"] + " " + df["ScreenResolution"] + " " +\
df["Cpu"] + " " + df["Ram"] + " RAM " + df["Memory"] + " " + df["Gpu"]})

def printBaseDf():
    print(baseRecDf.head())
    
    
    
def clean_description(recDf):
  # generating clean text by removing the stopwords and special characters
  recDf['clean_description'] = recDf['description'].apply(lambda x: x.lower().strip())
  recDf['clean_description'] = recDf['clean_description'].apply(nfx.remove_stopwords)
  recDf['clean_description'] = recDf['clean_description'].apply(nfx.remove_special_characters)

def getcosinemat(recDf):
  # vectorizing the Clean_description
  countvect = CountVectorizer()
  cv_mat = countvect.fit_transform(recDf['clean_description'])
  return cv_mat

def cosinesimmat(cv_mat):
    return cosine_similarity(cv_mat)

def dfConcat(df, dictVal):
    row = pd.Series(dictVal)
    return pd.concat([
        df,
        pd.DataFrame([row], columns = row.index)
    ]).reset_index(drop = True)



def recommend_laptops(description, num_rec = 20):
  recDf = dfConcat(baseRecDf, {"description": description})
  clean_description(recDf)
  cosine_sim_mat = cosinesimmat(getcosinemat(recDf))

  scores = list(enumerate(cosine_sim_mat[-1]))
  sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)
  selected_desc_index = [i[0] for i in sorted_scores[1:]][:num_rec]

  return df.iloc[selected_desc_index], selected_desc_index
