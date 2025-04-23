const decipherDreams = [
    {
        phrase: '«The mirror shows me, but I don`t recognize the reflection» ',
        options: [ 'Mirror', 'Mystery', 'Past', 'Mask' ],
        check: [
            {
                selected: ['Mirror', 'Mystery', 'Mask'],
                resultText: 'You see a mask instead of your face because the secret you hide has become part of you. The mirror doesn’t lie — it reflects only what you allow yourself to show. But a crack in the glass could become a door if you look at the right angle. 🔍✨'
            },
            {
                selected: ['Mirror', 'Past', 'Mask'],
                resultText: 'The reflection is a ghost from the past. It wears the same mask you do now but has forgotten how to remove it. Maybe the mirror is trying to remind you: what you hide will one day become your only face. 👻💔'
            },
            {
                selected: [ 'Mystery', 'Past', 'Mask'],
                resultText: 'The mask once protected you, but now it’s fused to your skin. The secret you buried in the past is growing through it like roots. The mirror stays silent, but its silence screams: ‘Look down — the key is at your feet.’ 🔑🌱'
            },
            {
                selected: [ 'Mirror', 'Mystery', 'Past'],
                resultText: 'The mirror blurs the line between what’s forgotten and what still hides. Mystery clouds the past, but the reflection shows a version of you untouched by time. You’re not lost — just waiting to be found. 🪞⏳'
            },
        ]
    },
    {
        phrase: '«I’m Holding a Key That Unlocks Nothing» ',
        options: [ 'Key', 'Door', 'Shadow', 'Clock' ],
        check: [
            {
                selected: [ 'Key', 'Door', 'Shadow' ],
                resultText: 'The key fits, but the door won’t open — because what you seek is already inside. The shadow whispers: ‘Turn around. The real lock is the one you carry in your chest.’ 🗝️💔'
            },
            {
                selected: [ 'Key', 'Shadow', 'Clock' ],
                resultText: 'The key isn’t for doors — it winds the clock of forgotten choices. The shadow grows longer, counting seconds until you ask: ‘What if time itself is the lock?’ ⏳🔓'
            },
            {
                selected: [ 'Door', 'Shadow', 'Clock' ],
                resultText: 'The door is a clock face. Every hour, it offers a new exit, but the shadow blocks your path. Maybe the answer isn’t to open it — but to step into the dark. 🌑🕰️'
            },
            {
                selected: [ 'Key', 'Door', 'Clock' ],
                resultText: 'The door ticks softly, but the key doesn’t fit — not because it’s wrong, but because the lock has no shape. Some doors open only when time forgets to close them. Wait, and you’ll hear the click. 🔐⏱️'
            }
        ]
    },
    {
        phrase: '«A River Flows Backward in the Moonlight» ',
        options: [ 'River', 'Moon', 'Mirror', 'Whisper' ],
        check: [
            {
                selected: [ 'River','Moon', 'Mirror' ],
                resultText: 'The river carries reflections of the past. The moon watches you try to drink from it — but the mirror warns: ‘Careful, you might drown in memories.’ 💧🌌'
            },
            {
                selected: [ 'River', 'Moon', 'Whisper' ],
                resultText: 'The river’s backward flow is a whisper: ‘What if regrets are just stories told in reverse?’ The moon smiles — it knows you’ll rewrite them by dawn. 📜✨'
            },
            {
                selected: [ 'Moon', 'Mirror', 'Whisper' ],
                resultText: 'The mirror shows the river’s end, where whispers become voices. The moon says: ‘To move forward, first listen to what flows behind you.’ 🔄👂'
            },
            {
                selected: [ 'River', 'Mirror', 'Whisper' ],
                resultText: 'The river reflects what the mirror conceals. Whispers drift over the surface like fallen leaves. They don’t speak — they remember. The current pulls you backward, toward a truth you didn’t know you lost. 🌊🕯️'
            }
        ]
    }
];

export default decipherDreams;