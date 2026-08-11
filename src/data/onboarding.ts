import {AnimationObject} from 'lottie-react-native';

export interface OnboardingData {
    id: number;
    animation: AnimationObject;
    text: string;
    subtext: string;
    textColor: string;
    backgroundColor: string;
}

const dataOnboarding: OnboardingData[] = [
    {
        id: 1,
        animation: require('../assets/animations/Onboarding1.json'),
        text: 'Aprenda no seu ritmo',
        subtext: 'Flashcards para otimizar sua rotina de estudos.',
        textColor: '#FDCA40',
        backgroundColor: '#8A3FFC',
    },
    {
        id: 2,
        animation: require('../assets/animations/Onboarding2.json'),
        text: 'Domine qualquer conteúdo',
        subtext: 'De idiomas a provas e exames, revise o que importa.',
        textColor: '#090a09',
        backgroundColor: '#FF3385',
    },
    {
        id: 3,
        animation: require('../assets/animations/Onboarding3.json'),
        text: 'Conquiste seus objetivos',
        subtext: 'Técnicas de repetição para você nunca esquecer.',
        textColor: '#f8424e',
        backgroundColor: '#00D2FF',
    }
];

export default dataOnboarding