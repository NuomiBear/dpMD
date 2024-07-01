# UNICOM

## LINUX

### OpenStack

`source openrc`

`glance image-list`

`glance image-show`

`glance stores-info`

`nova list --all`

`ironic node-list`

`neutron port-list --network-id`

`nova interface-list`

`openstack floating ip show 58.144.196.61`

`openstack server show`

`cinder show`

`neutron port-show`

```
ls /home
scp -l 3000 /home/XXX.iso root@XXX:/tmp/
bg
ps ef|grep scp
fg
```

```
neutron -h|grep l3-agent
neutron l3-agent-list-hosting-router XXX
```

```
neturon -h|grep lbaas
neturon lbass-loadbalancer-list
neturon lbaas-agent-hosting-loadbalancer XXX
kubectl get pods -o wide -n openstack |grep lbaas |grep XXX
kubectl exec -it -n openstack XXX --bash
ps -ef|grep nginx
ps -ef|grep nginx|grep XXX
cat
```

```
yum install epel-release
yum install nginx
nginx
```

```
系统私网IP地址
/etc/sysconfig/network-scripts-ifcfg-enp1s0
查看私网IP内部浮动网IP
nova interface-list 69513ebb-9a34-4dd3-b8d0-8035dadfbb20
```
