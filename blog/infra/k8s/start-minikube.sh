alias kubectl="minikube kubectl --"
minikube start --extra-config=kubeadm.ignore-preflight-errors=NumCPU --force --cpus 1