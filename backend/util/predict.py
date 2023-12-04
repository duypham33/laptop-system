# Load model
import pickle
import pandas as pd
import numpy as np
from util.recommend import baseRecDf, recommend_laptops
from sklearn.ensemble import RandomForestRegressor

with open('data/pipe.pkl','rb') as f:
  rf = pickle.load(f)
  f.close()
  
df = pd.read_csv('data/transformed_data.csv')
df = df.drop(columns=["Unnamed: 0"])



def getOs(os):
  if os is None:
    return None

  if "mac" in os.lower():
    return "Mac"
  return "Windows" if "windows" in os.lower() else "Other"

def getDisk(disk):
  if disk is None:
    return None

  if disk < 1024:
    return f"{disk}GB SSD"
  return "1TB" if disk ==  1024 else "2TB"

def getRows(company, typename, os, ram, disk, cpu, gpu):
  row = {
    "Company": company,
    "TypeName": typename,
    "OpSys": getOs(os),
    "Ram": ram,
    "SSD": disk,
    "CPU_name": cpu,
    "Gpu brand": gpu
  }

  row2 = {
      "Company": company,
      "TypeName": typename,
      "OpSys": os,
      "Ram": f"{ram}GB RAM" if ram is not None else None,
      "Memory": getDisk(disk),
      "Cpu": cpu,
      "Gpu": gpu
  }

  return row, row2


def getDescription(row2):
  words = [v if v is not None else '' for v in row2.values()]
  return ' '.join(words).strip()


def getRecDf(selected_desc_index, row):
  recDf = df.iloc[selected_desc_index].drop(columns=['Price'])
  # Fill user inputs
  for k, v in row.items():
    if v is None:
      continue
    recDf[k] = v
  return recDf

def modelPredict(recDf):
  predicted = []
  test = np.array(recDf)
  for i in range(len(test)):
      predicted.append(rf.predict([test[i]]))

  # as we transformed our price variable to np.log
  # we have to retranform it from np.log-->np.exp inorder to get the result
  ans = [np.exp(predicted[i][0]) for i in range(len(predicted))]
  recDf['Predicted Price'] = np.array(ans)


def predictPriceRange(company, typename, os, ram, disk, cpu, gpu):
  row, row2 = getRows(company, typename, os, ram, disk, cpu, gpu)
  relevants, selected_desc_index = recommend_laptops(getDescription(row2))
  recDf = getRecDf(selected_desc_index, row)

  modelPredict(recDf)
  min = recDf["Predicted Price"].min()
  max = recDf["Predicted Price"].max()
  return min, max, relevants