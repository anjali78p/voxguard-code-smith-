import pandas as pd, joblib
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split

df = pd.read_csv("features.csv")
X = df.drop(columns=["label"]).values
y = df["label"].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
clf = XGBClassifier(n_estimators=200, max_depth=6, eval_metric="logloss")
clf.fit(X_train, y_train)

print("Accuracy:", clf.score(X_test, y_test))
joblib.dump(clf, "backend/models/real_fake_xgb.pkl")
