import tensorflow as tf
from tensorflow.keras import layers
import json

image_shape = (224,224,3)
base_model = tf.keras.applications.EfficientNetV2B0(include_top=False,)
base_model.trainable = False
inputs =  layers.Input(shape = image_shape,name='input_layer')
x = base_model(inputs)
x = layers.GlobalAveragePooling2D(name='GlobalAveragePooling2D_layer')(x)
outputs = layers.Dense(38,activation='softmax',name='output_layer')(x)
feature_model = tf.keras.Model(inputs,outputs,name='plant_disease_model')

feature_model = tf.keras.models.load_model('./ai/fine_tune_checkpoints_best.weights.h5')

class_names = json.load(open('./ai/classes.json', 'r'))

def predict(img_path):
  global class_names, feature_model
  img = tf.io.read_file(img_path)

  img = tf.image.decode_image(img)

  img = tf.image.resize(img,size=(224,224))

  pred = feature_model.predict(tf.expand_dims(img,axis=0))

  predicted_value = class_names[pred.argmax()]
  return predicted_value