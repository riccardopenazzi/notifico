import { defineStore } from 'pinia';

import hackerImg from '../assets/hacker.png';
import gamerImg from '../assets/gamer.png';
import manImg from '../assets/man.png';
import womanImg from '../assets/woman.png';

export const useAssetsStore = defineStore('assetsStore', {
    state() {
        return {
            
        };
    },
    getters: {
        avatarsList() {
            return [{
                label: 'hacker',
                value: 'hacker',
                src: hackerImg,
            },{
                label: 'gamer',
                value: 'gamer',
                src: gamerImg,
            },{
                label: 'man',
                value: 'man',
                src: manImg,
            },{
                label: 'woman',
                value: 'woman',
                src: womanImg,
            }];
        },
    },
    actions: {
        // Action
    },
});