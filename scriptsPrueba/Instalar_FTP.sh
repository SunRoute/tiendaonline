#!/bin/bash

apt install vsftpd

sed -i 's/write_enable=.*/write_enable=YES/' /etc/vsftpd.conf
sed -i 's/local_umask=.*/local_umask=022/' /etc/vsftpd.conf
sed -i 's/chroot_local_user=.*/chroot_local_user=YES/' /etc/vsftpd.conf
sed -i 's/chroot_list_enable=.*/chroot_list_enable=YES/' /etc/vsftpd.conf
sed -i 's/chroot_list_file=.*/chroot_list_file=/etc/vsftpd.chroot_list/' /etc/vsftpd.conf

USER=$(whoami) 

sed -i "s/$USER/" /etc/vsftpd.chroot_list

systemctl restart vsftpd