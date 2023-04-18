# VM Analytics Manifesto

## Ethos
We aim to build an engaging two-way marketplace of open web applications for developers and users. To iterate on UX experiments as we work towards this goal, we need to understand the behavior of user cohorts and the UX pathways they most and least engage with. User information is protected by not recording PII such as wallet or IP addresses.

## Long Term
The current implementation is a temporary solution. Our long-term goal is to implement a more sustainable, non-centralized product analytics solution. This is going to be on the roadmap for Q3 and Q4 of 2023. 

## Privacy
- Wallet addresses are not recorded
- User activity is anonymized and analyzed in aggregate

## Opt-In by Default
- Gateway analytics are not collected by default. Any gateway which uses the Near Discovery VM must opt into sharing usage information by passing segmentId=diA7hiO28gGeb9fxn615Xs91uX3GyYhL into call to initNear
```
initNear({
        segmentId: 'diA7hiO28gGeb9fxn615Xs91uX3GyYhL'
        networkId: '...',
        ...
      });
```

## Product Usage Events Recorded
- Component Impressions
- Component Engagements  
1. clicks
1. hovers 
- Referrer page 
- Wallect Connect & Disconnect


