#!/bin/bash
echo "Starting minikube..."
minikube start
echo "Enabling ingress..."
minikube addons enable ingress
echo "starting skaffold"
skaffold dev