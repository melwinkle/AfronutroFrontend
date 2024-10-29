import CustomButton from './components/common/CustomButton';

// In your component
<div>
<CustomButton onClick={() => console.log('Clicked!')}>
  Click me
</CustomButton>

<CustomButton variant="secondary" onClick={() => console.log('Secondary clicked!')}>
  Secondary Action
</CustomButton>

<CustomButton variant="cta" onClick={() => console.log('CTA clicked!')}>
  Sign Up Now!
</CustomButton>
</div>