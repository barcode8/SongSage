from flask import Flask,Blueprint,jsonify

home_bp=Blueprint("home",__name__)

@home_bp.route("/",methods=["GET"])
@home_bp.route("/home",methods=["GET"])
def home():
    return jsonify({"message":"Welcome to SongSage"})